const express = require('express');
const ChatMessage = require('../models/ChatMessage');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/chat/:roomId
// @desc    Get chat messages for a room
// @access  Private
router.get('/:roomId', auth, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ roomId: req.params.roomId })
      .populate('sender', 'name')
      .sort({ createdAt: 1 })
      .limit(100);

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/chat/:roomId
// @desc    Save a chat message
// @access  Private
router.post('/:roomId', auth, async (req, res) => {
  try {
    const { message, type } = req.body;

    const chatMessage = new ChatMessage({
      roomId: req.params.roomId,
      sender: req.user.id,
      message,
      type: type || 'text'
    });

    await chatMessage.save();
    await chatMessage.populate('sender', 'name');

    res.status(201).json(chatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


