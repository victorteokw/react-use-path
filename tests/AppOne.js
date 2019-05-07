const React = require('react');
const usePath = require('../index');

const AppOne = () => {
  const [path, setPath] = usePath();
  return React.createElement('div', {}, null);
};

module.exports = AppOne;
