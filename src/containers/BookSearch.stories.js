// modules
import React from 'react';
// components
import BookSearch from './BookSearch';

export default {
  title: 'Containers/BookSearch',
  component: BookSearch,
  args: {
    query: 'Emma',
    queryType: 'Title'
  }
};

const Template = (args) => <BookSearch {...args} />;

export const Default = Template.bind({});