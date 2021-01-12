import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import Book from './Book';
import SpineGenerator from './SpineGenerator';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingBook: null,
      showResults: false,
      query: "",
      queryType: "all",
      queryURL: "",
      start: 0,
      results: {}
    };

    this.api_url = "https://openlibrary.org/search.json?";
    this.apiPerPage = 100;
    this.displayPerPage = 10;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleAddCover = this.handleAddCover.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  render() {
    return (
      <div className="search">
        <SearchInput
          query={this.state.query}
          queryType={this.state.queryType}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
        {this.state.showResults &&
          <SearchResults
            query={this.state.query}
            results={this.state.results}
            start={this.state.start}
            pageCount={this.state.pageCount}
            books={this.props.books}
            addBook={this.handleAddBook}
            addingBook={this.state.addingBook}
            addCover={this.handleAddCover}
            handlePageClick={this.handlePageClick} />
        }
      </div>
    );
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const queryType = (this.state.queryType === 'all') ? 'q' : this.state.queryType;
    let url = this.api_url + queryType + '=' + this.state.query;
    this.setState({
      showResults: true,
      results: {},
      queryURL: url,
      start: 0
    });
    this.fetchResultsPage(url, 0);
  }

  handleAddBook(event) {
    // this.props.addBook(event);
    this.setState({
      addingBook: event
    });
    console.log(event);
  }

  handleAddCover(item) {
    console.log(item);
    this.props.addBook(item);
    this.setState({
      addingBook: null
    });
  }

  fetchResultsPage(url, start) {
    let apiPage = Math.floor(start / this.apiPerPage) + 1;
    fetch(url + "&page=" + apiPage)
      .then(response => response.json())
      .then(data => {
        data.docs = data.docs.slice(start % this.apiPerPage, start + this.displayPerPage);
        this.setState({
          results: data,
          pageCount: Math.ceil(data.numFound / this.apiPerPage * this.displayPerPage)
        });
        console.log(this.state);
      });
  }

  handlePageClick(data) {
    let start = (data.selected * this.displayPerPage) % this.apiPerPage;
    this.setState({start: start});
    this.fetchResultsPage(this.state.queryURL, start);
  }
}

function SearchInput(props) {
  return (
    <div className="search_input">
      <h2>Add a book</h2>
      <form className="search_form" onSubmit={props.handleSubmit}>
        <label htmlFor="query">Search</label>
        <input
          type="text"
          name="query"
          id="query"
          value={props.query}
          onChange={props.handleChange} />
        <QueryTypeRadio value="All" queryType={props.queryType} onChange={props.handleChange} />
        <QueryTypeRadio value="Title" queryType={props.queryType} onChange={props.handleChange} />
        <QueryTypeRadio value="Author" queryType={props.queryType} onChange={props.handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

function QueryTypeRadio(props) {
  return (
    <React.Fragment>
      <input
        type="radio"
        name="queryType"
        value={props.value.toLowerCase()}
        id={props.value.toLowerCase()}
        checked={props.queryType === props.value.toLowerCase()}
        onChange={props.onChange} />
      <label htmlFor={props.value.toLowerCase()}>{props.value}</label>
    </React.Fragment>
  );
}

function SearchResults(props) {
  if (Object.values(props.results).length > 0) {
    if (props.results.numFound > 0) {
      return (
        <div className="search_results">
          <p>Showing {props.start + 1}–{props.start + props.results.docs.length} of {props.results.numFound} results for "{props.query}"</p>
          <ul className="results_list bookList">
            {props.results.docs.map((item, i) => (
              <li key={item.key} className="bookList_item">
                <Book
                  item={item}
                  action="add"
                  addBook={props.addBook}
                  isInBooks={props.books.includes(item)} />
                {props.addingBook === item &&
                  <SpineGenerator data={item} handleAdd={props.addCover.bind(this, item)} />
                }
              </li>
            ))}
          </ul>
          <ReactPaginate
            pageCount={props.pageCount}
            onPageChange={props.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'} />
        </div>
      );
    } else {
      return (
        <div className="search_results">
          <p>No results found for "{props.query}".</p>
        </div>
      );
    }
  } else {
    return (
      <div className="search_results">
        <p>Loading results for "{props.query}"...</p>
      </div>
    );
  }
}

export default BookSearch;