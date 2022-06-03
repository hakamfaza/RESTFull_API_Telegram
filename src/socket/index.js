module.exports = (io, socket) => {
  socket.io('ping', (data) => {
    socket.emit('ping-response', data);
  });
};
