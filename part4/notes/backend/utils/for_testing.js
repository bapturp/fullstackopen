const reverse = (string) => string.split('').reverse().join('');

const average = (array) =>
  array.length === 0
    ? 0
    : array.reduce((acc, val) => acc + val, 0) / array.length;

module.exports = {
  reverse,
  average,
};
