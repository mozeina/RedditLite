// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// src/setupTests.js

// Mock axios
jest.mock('axios');

// Mock react-markdown
jest.mock('react-markdown', () => {
    return function DummyMarkdown(props) {
        return <div>{props.children}</div>;
    };
});
