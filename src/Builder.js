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
  }

  render() {
    return (
      <div className="builder">
        <BookSearch books={this.state.books} addBook={this.addBook} />
        <Bookshelf books={this.state.books} />
      </div>
    );
  }

  addBook(item) {
    let _books = this.state.books.slice();
    _books.push(item);
    this.setState({
      books: _books
    });
    console.log(this.state);
  }
}

export default Builder;