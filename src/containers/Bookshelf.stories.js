// modules
import React from 'react';
// components
import Bookshelf from './Bookshelf';

export default {
  title: 'Containers/Bookshelf',
  component: Bookshelf
};

const Template = (args) => <Bookshelf {...args} />;

export const Viewing = Template.bind({});
Viewing.args = { isEditing: false };

export const Editing = Template.bind({});
Editing.args = { isEditing: true };