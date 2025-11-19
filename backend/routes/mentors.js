const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/mentors
// @desc    Get all mentors with filters
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { industry, skills, minRating, search } = req.query;
    const query = { role: 'mentor' };

    if (industry) {
      query['profile.industry'] = new RegExp(industry, 'i');
    }

    if (skills) {
      query['profile.skills'] = { $in: skills.split(',') };
    }

    if (minRating) {
      query['profile.rating.average'] = { $gte: parseFloat(minRating) };
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { 'profile.bio': new RegExp(search, 'i') }
      ];
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

// @route   GET /api/mentors/:id
// @desc    Get mentor by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const mentor = await User.findOne({
      _id: req.params.id,
      role: 'mentor'
    }).select('-password -email');

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json(mentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


