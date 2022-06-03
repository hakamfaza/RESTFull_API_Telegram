module.exports = (io, socket) => {
  socket.on('ping', (data) => {
    socket.emit('ping-response', data);
  });
  socket.on('join-room', (data) => {
    // Receiver
    const {
      id, email, password, usernmae,
    } = data;
    socket.join(id);
  });
  socket.on('send-message', (data) => {
    // io.emit('send-message-response', message);
  });
};
