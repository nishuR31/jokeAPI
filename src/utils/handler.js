// utils/handler.js
const handler = (func) => {
  return (...args) => {
    try {
      return func(...args);
    } catch (err) {
      console.log(err);
    }
  };
};

export default handler;
