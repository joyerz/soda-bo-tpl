import React from 'react';
import {shallow} from 'enzyme';
import Button from '../../../src/components/Button';
jest.useFakeTimers();


test('Button Disable', () => {
  const button = shallow(<Button disable={true}>Click Me</Button>);
  button.simulate('click');
  expect(setTimeout).not.toBeCalled();
  expect(button.instance().timer).toEqual(0);
});

test('Button Enable', () => {
  const button = shallow(<Button>Click Me</Button>);

  // button render
  expect(button.text()).toEqual('Click Me');

  // 300ms disable onAfter button click
  button.simulate('click');
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(button.state().disable).toEqual(true);
  expect(button.instance().timer).not.toEqual(0);
});

