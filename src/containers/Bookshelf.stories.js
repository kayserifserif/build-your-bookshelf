// modules
import React from 'react';
// components
import Bookshelf from './Bookshelf';

export default {
  title: 'Containers/Bookshelf',
  component: Bookshelf
};

const Template = (args) => <Bookshelf {...args} />;

export const Default = Template.bind({});