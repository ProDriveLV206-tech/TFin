require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// attach routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => res.send('Agora server running'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  // when client sends message, save to DB and broadcast
  socket.on('sendMessage', async (data) => {
    try {
      const Message = require('./models/Message');
      const m = await Message.create({
        senderId: data.senderId || null,
        senderName: data.name || data.senderName || 'Anon',
        text: data.text
      });
      io.emit('message', { _id: m._id, senderName: m.senderName, text: m.text, createdAt: m.createdAt });
    } catch (err) {
      console.error('msg save err', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server listening on port', PORT));
