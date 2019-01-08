// import React from 'react';
// import { shallow } from 'enzyme';
// import MyComponent from '../components/MyComponent';

// describe("MyComponent", () => {
//   it("should render my component", () => {
//     const wrapper = shallow(<MyComponent />);
//   });
// });

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});