// modules
import React from 'react';
// components
import BookResult from './BookResult';

export default {
  title: 'Components/BookResult',
  component: BookResult,
  args: {
    item: {
      author_name: ['Jane Austen'],
      cover_edition_key: 'OL13573615M',
      colors: {
        "vibrant": "#765232",
        "lightVibrant": "#faedc3",
        "darkVibrant": "#440414",
        "muted": "#a48c5c",
        "lightMuted": "#b89c7e",
        "darkMuted": "#5c3a2f"
      },
      first_publish_year: 1816,
      title: 'Emma',
      publisher: ['Dramatic Pub.']
    }
  },
    decorators: [(Story) => <div style={{ width: '250px', height: '500px' }}><Story/></div>]
};

const Template = (args) => <BookResult {...args} />;

export const Default = Template.bind({});