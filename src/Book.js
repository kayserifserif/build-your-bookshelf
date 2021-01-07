import React, { Component } from 'react';

class Book extends Component {
  render() {
    return (
      <div className="book">
        <p className="book_title">Title: {this.props.item.title}</p>
        <p className="book_author">Author: {Array.isArray(this.props.item.author_name) ? this.props.item.author_name.join(', ') : this.props.item.author_name}</p>
        <p className="book_firstPublished">First published: {this.props.item.first_publish_year}</p>
        {this.props.children}
      </div>
    );
  }
}

export default Book;