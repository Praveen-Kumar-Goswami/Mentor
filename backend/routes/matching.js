const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// AI-driven matching algorithm
const calculateMatchScore = (mentee, mentor) => {
  let score = 0;
  let factors = [];

  // Industry match (30 points)
  if (mentee.profile?.industry && mentor.profile?.industry) {
    if (mentee.profile.industry.toLowerCase() === mentor.profile.industry.toLowerCase()) {
      score += 30;
      factors.push('Industry match');
    }
  }

  // Skills match (40 points)
  if (mentee.profile?.skills && mentor.profile?.skills) {
    const menteeSkills = mentee.profile.skills.map(s => s.toLowerCase());
    const mentorSkills = mentor.profile.skills.map(s => s.toLowerCase());
    const commonSkills = menteeSkills.filter(s => mentorSkills.includes(s));
    const skillMatchRatio = commonSkills.length / Math.max(menteeSkills.length, 1);
    score += skillMatchRatio * 40;
    if (commonSkills.length > 0) {
      factors.push(`${commonSkills.length} common skills`);
    }
  }

  // Experience level (20 points)
  if (mentor.profile?.experience) {
    const experienceScore = Math.min(mentor.profile.experience / 10, 1) * 20;
    score += experienceScore;
    factors.push(`${mentor.profile.experience} years experience`);
  }

  // Rating (10 points)
  if (mentor.profile?.rating?.average) {
    score += (mentor.profile.rating.average / 5) * 10;
    factors.push(`Rating: ${mentor.profile.rating.average.toFixed(1)}`);
  }

  return { score, factors };
};

// @route   GET /api/matching/suggestions
// @desc    Get mentor suggestions for mentee
// @access  Private
router.get('/suggestions', auth, async (req, res) => {
  try {
    if (req.user.role !== 'mentee') {
      return res.status(403).json({ message: 'Only mentees can get mentor suggestions' });
    }

    const mentee = await User.findById(req.user.id);
    const mentors = await User.find({ role: 'mentor' }).select('-password -email');

    const matches = mentors.map(mentor => {
      const matchResult = calculateMatchScore(mentee, mentor);
      return {
        mentor: {
          id: mentor._id,
          name: mentor.name,
          profile: mentor.profile
        },
        matchScore: matchResult.score,
        matchFactors: matchResult.factors
      };
    });

    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/matching/search
// @desc    Search mentors with custom criteria
// @access  Private
router.post('/search', auth, async (req, res) => {
  try {
    const { industry, skills, minExperience, maxPrice } = req.body;
    const query = { role: 'mentor' };

    if (industry) {
      query['profile.industry'] = new RegExp(industry, 'i');
    }

    if (skills && skills.length > 0) {
      query['profile.skills'] = { $in: skills };
    }

    if (minExperience) {
      query['profile.experience'] = { $gte: minExperience };
    }

    if (maxPrice) {
      query['profile.pricePerHour'] = { $lte: maxPrice };
    }

    const mentors = await User.find(query)
      .select('-password -email')
      .sort({ 'profile.rating.average': -1 });

    res.json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


