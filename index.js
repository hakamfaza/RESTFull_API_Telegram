const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const { PORT } = require('./src/utils/env');

const socketController = require('./src/socket');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.json({
    message: 'PONG!',
  });
});

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('new user connected!');

  socketController(io, socket);
});

try {
  // app.use(user)
} catch (error) {
  console.log(error);
}

const APP_PORT = PORT || 4007;

server.listen(APP_PORT, () => {
  console.log(`service runnit at port ${APP_PORT}`);
});
