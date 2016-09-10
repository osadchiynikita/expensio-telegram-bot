module.exports = {
  getRandom: (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }
};
