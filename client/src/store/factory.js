export const CREATE = (arr, obj) => {
  arr.push(obj);
};

export const DELETE = (arr, id) => {
  return arr.filter((el) => el._id !== id);
};
