// modules
import React from 'react';
// components
import Book from './Book';

export default {
  title: 'Components/Book',
  component: Book,
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
  }
};

const Template = (args) => <Book {...args} />;

export const Default = Template.bind({});