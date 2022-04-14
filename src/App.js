// modules
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// components
import Header from './components/Header';
import BookSearch from './containers/BookSearch';
import Bookshelf from './containers/Bookshelf';
import Footer from './components/Footer';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Spines from './containers/Spines';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.clearBooks = this.clearBooks.bind(this);
  }

  render() {
    return (
      <Router>
        <Routes>

          <Route exact path="/" element={
            <Home books={this.state.books} removeBook={this.removeBook} clearBooks={this.clearBooks} />
          } />

          <Route path="/edit" element={
            <Edit books={this.state.books} removeBook={this.removeBook} clearBooks={this.clearBooks} addBook={this.addBook} />
          } />

          <Route path="/spines" element={<Spines />} />

        </Routes>
      </Router>
    );
  }

  addBook(item) {
    let _books = this.state.books.slice();
    _books.push(item);
    console.log(_books);
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

  clearBooks() {
    this.setState({ books: [] });
  }
}

export default App;