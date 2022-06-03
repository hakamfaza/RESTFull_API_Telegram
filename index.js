const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const { PORT } = require('./src/utils/env');

const socketController = require('./src/socket');
const auth = require('./src/routers/auth.routers');
const users = require('./src/routers/users.routers');

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

const data = () => {
  try {
    app.use(auth);
    app.use(users);
  } catch (error) {
    console.log(error);
  }
};

data();

const APP_PORT = PORT || 4007;

server.listen(APP_PORT, () => {
  console.log(`service runnit at port ${APP_PORT}`);
});
