const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.get('/messages', async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: 1 }).limit(100);
  res.json(msgs);
});

router.post('/message', async (req, res) => {
  const { senderId, senderName, text } = req.body;
  const m = await Message.create({ senderId, senderName, text });
  res.json(m);
});

module.exports = router;
