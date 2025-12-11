const express = require('express');
const User = require('../models/User');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.countDocuments();
  const messages = await Message.countDocuments();
  res.json({ users, messages });
});

router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select('-passwordHash').lean();
  res.json(users);
});

router.post('/kick', authMiddleware, adminMiddleware, async (req, res) => {
  const { socketId, reason } = req.body;
  const io = req.app.get('io');
  if (!io) return res.status(500).json({ error: 'io not ready' });
  io.to(socketId).emit('forceDisconnect', { reason: reason || 'Kicked by admin' });
  res.json({ ok: true });
});

router.post('/ban', authMiddleware, adminMiddleware, async (req, res) => {
  const { userId, reason } = req.body;
  if (!userId) return res.status(400).json({ error: 'missing userId' });
  await User.findByIdAndUpdate(userId, { $set: { banned: true } });
  const io = req.app.get('io');
  io && io.emit('serverNotice', { msg: `User ${userId} was banned: ${reason || 'no reason'}` });
  res.json({ ok: true });
});

module.exports = router;
