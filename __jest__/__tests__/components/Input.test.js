import React from 'react';
import { mount } from 'enzyme';

import Input from '../../../src/components/Fields/Input';

test('test Input validation', () => {
  // required
  let wrapper = mount(<Input rules={['required']} defaultValue="" />);
  expect(wrapper.instance().validate()).toBeFalsy();

  // number
  wrapper = mount(<Input rules={['required', 'number']} defaultValue="12" />);
  expect(wrapper.instance().getValue()).toEqual("12");
  expect(wrapper.instance().validate()).toBeTruthy();

  // change and make validation again
  const input = wrapper.find('input');
  input.instance().value = 'abc';
  expect(wrapper.instance().validate()).toBeFalsy();
});

test('test Input unit render', () => {
  // unit
  let wrapper = mount(<Input rules={['required']} defaultValue="" unit="元" />);
  expect(wrapper.find('.unit').length).toEqual(1);

  // unit left
  wrapper = mount(<Input rules={['required']} defaultValue="" unit="元" unitPosition="left" />);
  expect(wrapper.find('.unit').length).toEqual(1);
  expect(wrapper.find('.left').length).toEqual(1);

  // disabled
  wrapper = mount(<Input rules={['required', 'number']} defaultValue="12" disable={true} />);
  expect(wrapper.find('input').props()["disabled"]).toBeTruthy();
});
