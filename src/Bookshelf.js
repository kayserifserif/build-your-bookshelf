import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2>Your bookshelf</h2>
        <ul className="bookshelf_list bookList">
          {this.props.books.map((item, i) => (
            <li key={item.key}>
              <Book
                key={item.key}
                item={item}
                action="remove"
                removeBook={this.props.removeBook} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Bookshelf;