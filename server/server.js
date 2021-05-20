const mongoose = require('mongoose');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const http = require('http');
dotenv.config({ path: './config.env' });
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

const postController = require('./controllers/postController');

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

  //Listen for when a user joined the room
  socket.on('join-room', ({ username, room }) => {
    console.log({ username, room });
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //Welcome user to the app
    socket.emit('welcome', 'Welcome to the App!');

    socket.broadcast
      .to(user.room)
      .emit('user-join', `${user.username} has joined the chat`);
  });

  socket.on('leave-room', ({ id, room, username }) => {
    console.log('leave', { id, room, username });
    const user = userLeave(socket.id);
    console.log(user);
    socket.leave(room);
    socket.broadcast.to(room).emit('leave-room', `${username} left the room`);
  });

  //Recieve Message
  socket.on('chat-message', async (message) => {
    //Save Message to DB
    const result = await postController.createPost(message);
    //Emit message to server
    io.in(message.category).emit('chat-message', result);
  });

  //Listen for when a user is typing
  socket.on('typing', (user) => {
    const post = {
      id: Date.now(),
      typing: true,
      user,
    };
    console.log('typing...');
    socket.broadcast.to(user.room).emit('typing', post);
  });

  //Listen for when a user stopped typing
  socket.on('stopTyping', (id) => {
    console.log('stopped typing..');
    socket.broadcast.emit('stopTyping', id);
  });

  //Run when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    console.log('left', user);

    if (user)
      io.to(user.room).emit('user-exit', `${user.username} has left the chat`);
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
