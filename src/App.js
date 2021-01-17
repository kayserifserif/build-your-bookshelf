// modules
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import Header from './components/Header';
import BookSearch from './containers/BookSearch';
import Bookshelf from './containers/Bookshelf';
import Footer from './components/Footer';
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
        <Switch>

          <Route exact path="/">
            <main className="main isViewing">
              <Header />
              <Bookshelf
                books={this.state.books} removeBook={this.removeBook} clearBooks={this.clearBooks}
                isEditing={false} />
              <Footer />
            </main>
          </Route>

          <Route path="/edit">
            <main className="main isEditing">
              <Header />
              <BookSearch
                  books={this.state.books} addBook={this.addBook} />
              <Bookshelf
                books={this.state.books} removeBook={this.removeBook} clearBooks={this.clearBooks}
                isEditing={true} />
              <Footer />
            </main>
          </Route>

          <Route path="/spines">
            <Spines />
          </Route>

        </Switch>
      </Router>
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

  clearBooks() {
    this.setState({ books: [] });
  }
}

export default App;