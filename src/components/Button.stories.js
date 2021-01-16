// modules
import React from 'react';
// components
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button'
  }
};

const Template = (args) => <Button {...args} />;

export const Enabled = Template.bind({});
Enabled.args = { disabled: false };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };