export const CREATE = (arr, obj) => {
  arr.push(obj);
};

export const EDIT = (arr, obj) => {
  const index = arr.findIndex((el) => el._id === obj._id);
  arr.splice(index, 1, obj);
};

export const DELETE = (arr, id) => {
  return arr.filter((el) => el._id !== id);
};
