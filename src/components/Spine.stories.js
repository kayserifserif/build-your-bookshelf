// modules
import React from 'react';
// components
import SpineCanvas from './SpineCanvas';

export default {
  title: 'Components/SpineCanvas',
  component: SpineCanvas,
  args: {
    colors: {
      "vibrant": "#765232",
      "lightVibrant": "#faedc3",
      "darkVibrant": "#440414",
      "muted": "#a48c5c",
      "lightMuted": "#b89c7e",
      "darkMuted": "#5c3a2f"
    },
    cover_url: "https://covers.openlibrary.org/b/olid/OL13573615M-M.jpg",
    data: {
      author_name: ['Jane Austen'],
      cover_edition_key: 'OL13573615M',
      first_publish_year: 1816,
      title: 'Emma',
      publisher: ['Dramatic Pub.']
    }
  }
};

const Template = (args) => <SpineCanvas {...args} />;

export const ColorBlock = Template.bind({});
ColorBlock.args = { mode: 'colorBlock' };

export const ColorGradient = Template.bind({});
ColorGradient.args = { mode: 'colorGradient' };

export const CoverCrop = Template.bind({});
CoverCrop.args = { mode: 'coverCrop' };

export const CoverBlur = Template.bind({});
CoverBlur.args = { mode: 'coverBlur' };