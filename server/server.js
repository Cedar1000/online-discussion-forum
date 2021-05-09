const mongoose = require('mongoose');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const http = require('http');
dotenv.config({ path: './config.env' });

const app = require('./app');

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:8080',
    method: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

//Run when client connects
io.on('connection', (socket) => {
  console.log(socket.id, 'New Ws Connection...');

  socket.emit('welcome', 'Welcome to the App!');

  socket.on('chat-message', (message) => {
    console.log('Server', message);
    io.emit('chat-message', message);
  });
});

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

server.listen(port, '127.0.0.1', () => {
  console.log(`Application running on port ${port}`);
});
