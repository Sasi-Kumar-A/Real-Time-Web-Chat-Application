const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET','POST'] }
});

app.get('/', (req, res) => res.send('Chat server is running'));

io.on('connection', socket => {
  console.log('User connected', socket.id);

  // Broadcast messages to everyone
  socket.on('send-message', (msg) => {
    io.emit('receive-message', msg);
  });

  // Proper message seen broadcast
  socket.on('message-seen', msgId => {
    io.emit('message-seen', msgId); // emit to everyone including sender
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
