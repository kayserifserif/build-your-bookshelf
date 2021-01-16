// modules
import React from 'react';
// components
import SpinesGenerator from './SpinesGenerator';

export default {
  title: 'Components/SpinesGenerator',
  component: SpinesGenerator,
  args: {
    data: {
      author_name: ['Jane Austen'],
      cover_edition_key: 'OL13573615M',
      first_publish_year: 1816,
      title: 'Emma',
      publisher: ['Dramatic Pub.']
    },
    handleAdd: e => console.log(e)
  }
};

const Template = (args) => <SpinesGenerator {...args} />;

export const Default = Template.bind({});