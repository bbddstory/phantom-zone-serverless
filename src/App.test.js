// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './views/app';
import login from './tests/login';
import register from './tests/register';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('Index Page', () => {
  test('Can login', login, 20000);
  test('Can register', register, 20000);
});
