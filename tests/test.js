const React = require('react');
const { render, fireEvent, getByTestId } = require("react-testing-library");

describe('Examining the syntax of Jest tests', () => {

  it('sums numbers', () => {
    const AppOne = require('./AppOne');
    const { container } = render(React.createElement(AppOne, null, null));
    console.log(container);
   });
});
