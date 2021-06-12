let users = [];

// Join user to chat
const userJoin = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);

  return user;
};

//Get current user
const getCurrentUser = (id) => users.find((user) => user.id === id);

//User Leaves Chat
const userLeave = (id) => {
  const currentUser = getCurrentUser(id);
  users = users.filter((user) => user.id !== id);

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
