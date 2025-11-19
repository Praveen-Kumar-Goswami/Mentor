const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { mentorId, startTime, endTime, notes } = req.body;

    // Verify mentor exists
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    // Check if user is a mentee
    if (req.user.role !== 'mentee') {
      return res.status(403).json({ message: 'Only mentees can create bookings' });
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      mentor: mentorId,
      startTime: { $lt: new Date(endTime) },
      endTime: { $gt: new Date(startTime) },
      status: { $in: ['pending', 'confirmed'] }
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }

    const booking = new Booking({
      mentor: mentorId,
      mentee: req.user.id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      notes,
      meetingLink: `https://mentorconnect.app/meeting/${Date.now()}`
    });

    await booking.save();

    // Populate mentor and mentee details
    await booking.populate('mentor', 'name profile');
    await booking.populate('mentee', 'name');

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings
// @desc    Get user's bookings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'mentor' 
      ? { mentor: req.user.id }
      : { mentee: req.user.id };

    const bookings = await Booking.find(query)
      .populate('mentor', 'name profile')
      .populate('mentee', 'name')
      .sort({ startTime: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('mentor', 'name profile')
      .populate('mentee', 'name');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user has access to this booking
    if (booking.mentor._id.toString() !== req.user.id && 
        booking.mentee._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check permissions
    if (req.user.role === 'mentor' && booking.mentor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.user.role === 'mentee' && booking.mentee.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/mentor/:mentorId/availability
// @desc    Get mentor's available time slots
// @access  Private
router.get('/mentor/:mentorId/availability', auth, async (req, res) => {
  try {
    const mentor = await User.findById(req.params.mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    // Get existing bookings
    const bookings = await Booking.find({
      mentor: req.params.mentorId,
      status: { $in: ['pending', 'confirmed'] },
      startTime: { $gte: new Date() }
    });

    // This is a simplified version - in production, integrate with Calendly API
    const availability = {
      mentorId: mentor._id,
      timezone: mentor.profile?.availability?.timezone || 'UTC',
      workingHours: mentor.profile?.availability?.workingHours,
      daysAvailable: mentor.profile?.availability?.daysAvailable || [],
      bookedSlots: bookings.map(b => ({
        startTime: b.startTime,
        endTime: b.endTime
      }))
    };

    res.json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


