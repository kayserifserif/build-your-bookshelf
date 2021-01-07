import React, { Component } from 'react';
import BookSearch from './BookSearch';
import Bookshelf from './Bookshelf';

class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
  }

  render() {
    return (
      <div className="builder">
        <BookSearch books={this.state.books} addBook={this.addBook} />
        <Bookshelf books={this.state.books} removeBook={this.removeBook} />
      </div>
    );
  }

  addBook(item) {
    let _books = this.state.books.slice();
    _books.push(item);
    this.setState({ books: _books });
    console.log(this.state);
  }

  removeBook(item) {
    let _books = this.state.books.slice();
    let pos = _books.indexOf(item);
    if (pos >= 0) {
      _books.splice(pos, 1);
      this.setState({ books: _books });
      console.log(this.state);
    }
  }
}

export default Builder;