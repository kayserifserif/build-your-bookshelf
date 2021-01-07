import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2>Your bookshelf</h2>
        <ul className="books_list">
          {this.props.books.map((item, i) => (
            <Book key={item.key} item={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Bookshelf;