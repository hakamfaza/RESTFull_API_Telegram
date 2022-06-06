const { store, list } = require('../models/chats.models');

module.exports = (io, socket) => {
  socket.on('ping', (data) => {
    socket.emit('ping-response', data);
  });
  socket.on('join-room', (data) => {
    // Receiver
    const {
      id, email, password, username,
    } = data;
    socket.join(id);
  });
  socket.on('send-message', (data) => {
    store(data).then(async () => {
      const listChats = await list(data.sender, data.receiver);
      io.to(data.receiver).emit('send-message-response', listChats.rows);
    }).catch((err) => {
      console.log(err);
    });
  });
  socket.on('chat-history', async (data) => {
    const listChats = await list(data.sender, data.receiver);
    io.to(data.sender).emit('send-message-response', listChats.rows);
  });
};
