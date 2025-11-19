const express = require('express');
const Rating = require('../models/Rating');
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/ratings
// @desc    Create a rating for a mentor
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'mentee') {
      return res.status(403).json({ message: 'Only mentees can rate mentors' });
    }

    const { mentorId, bookingId, rating, feedback } = req.body;

    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.mentee.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.mentor.toString() !== mentorId) {
      return res.status(400).json({ message: 'Mentor ID does not match booking' });
    }

    // Check if rating already exists
    const existingRating = await Rating.findOne({ booking: bookingId });
    if (existingRating) {
      return res.status(400).json({ message: 'Rating already exists for this booking' });
    }

    // Create rating
    const newRating = new Rating({
      mentor: mentorId,
      mentee: req.user.id,
      booking: bookingId,
      rating,
      feedback
    });

    await newRating.save();

    // Update mentor's average rating
    const ratings = await Rating.find({ mentor: mentorId });
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    await User.findByIdAndUpdate(mentorId, {
      'profile.rating.average': averageRating,
      'profile.rating.count': ratings.length
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/ratings/mentor/:mentorId
// @desc    Get all ratings for a mentor
// @access  Private
router.get('/mentor/:mentorId', auth, async (req, res) => {
  try {
    const ratings = await Rating.find({ mentor: req.params.mentorId })
      .populate('mentee', 'name')
      .sort({ createdAt: -1 });

    res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


