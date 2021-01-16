// modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
// components
import BookResult from '../components/BookResult';
import SpinesGenerator from '../components/SpinesGenerator';
// assets
import './BookSearch.css';

/**
 * Interface for searching and browsing results
 */
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
    this.handleAddSpine = this.handleAddSpine.bind(this);
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
            addSpine={this.handleAddSpine}
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

  handleAddSpine(spineData) {
    // console.log(spineData);
    this.props.addBook(spineData);
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
                <BookResult
                  item={item}
                  action="add"
                  addBook={props.addBook}
                  isInBooks={props.books.includes(item)} />
                {props.addingBook === item &&
                  <SpinesGenerator data={item} handleAdd={props.addSpine} />
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

BookSearch.propTypes = {
  /**
   * Books added to bookshelf
   */
  books: PropTypes.array,
  /**
   * Search query
   */
  query: PropTypes.string,
  /**
   * Type of search query
   */
  queryType: PropTypes.oneOf(['Title', 'Author', 'All'])
};

BookSearch.defaultProps = {
  books: [],
  queryType: 'All'
};

export default BookSearch;