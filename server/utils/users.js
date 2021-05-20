let users = [];

// Join user to chat
const userJoin = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);
  console.log('7', users);

  return user;
};

//Get current user
const getCurrentUser = (id) => users.find((user) => user.id === id);

//User Leaves Chat
const userLeave = (id) => {
  console.log(id);
  console.log('18', users);
  const currentUser = getCurrentUser(id);
  users = users.filter((user) => user.id !== id);
  console.log('21', users);
  return currentUser;
};

//Get Users in a room
const getRoomUsers = (users) => users.filter((user) => user.room === room);

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
