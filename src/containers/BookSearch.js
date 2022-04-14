// modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
// components
import BookResult from '../components/BookResult';
import SpinesGenerator from '../components/SpinesGenerator';
// assets
import './BookSearch.css';

const API_URL = "https://openlibrary.org/search.json?";
const API_PER_PAGE = 100;
const DISPLAY_PER_PAGE = 10;

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleAddSpine = this.handleAddSpine.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
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
            handlePageClick={this.handlePageClick}
            cancelAdd={this.cancelAdd} />
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
    let url = API_URL + queryType + '=' + this.state.query;
    this.setState({
      showResults: true,
      results: {},
      queryURL: url,
      start: 0
    });
    this.fetchResultsPage(url, 0);
  }

  handleAddBook(event) {
    this.setState({
      addingBook: event
    });
  }

  handleAddSpine(spineData) {
    this.props.addBook(spineData);
    this.setState({
      addingBook: null
    });
  }

  fetchResultsPage(url, start) {
    let apiPage = Math.floor(start / API_PER_PAGE) + 1;
    fetch(url + "&page=" + apiPage)
      .then(response => response.json())
      .then(data => {
        data.docs = data.docs.slice(start % API_PER_PAGE, start + DISPLAY_PER_PAGE);
        this.setState({
          results: data,
          pageCount: Math.ceil(data.numFound / API_PER_PAGE * DISPLAY_PER_PAGE)
        });
        console.log(data);
      });
  }

  handlePageClick(data) {
    // TODO: go to top of search results
    let start = (data.selected * DISPLAY_PER_PAGE) % API_PER_PAGE;
    this.setState({start: start});
    this.fetchResultsPage(this.state.queryURL, start);
  }

  cancelAdd() {
    this.setState({addingBook: false});
  }
}

function SearchInput(props) {
  return (
    <div className="search_input">
      <h2>Add a book</h2>
      <form className="search_form" onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="query"
          id="query"
          className="search_box"
          value={props.query}
          onChange={props.handleChange} />
        <select name="queryType" value={props.queryType} onChange={props.handleChange}>
          <option value="all">All</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

function QueryTypeOption(props) {
  return (
    <React.Fragment>
      <option
        value={props.value.toLowerCase()}
        id={props.value.toLowerCase()}>
          {props.value}
      </option>
    </React.Fragment>
  );
}

function SearchResults(props) {
  if (Object.values(props.results).length > 0) {
    if (props.results.numFound > 0) {
      return (
        <div className="search_results">
          <p>Showing {props.start + 1}&ndash;{props.start + props.results.docs.length} of {props.results.numFound} results for "{props.query}"</p>
          <ul className="results_list">
            {props.results.docs.map((item, i) => (
              <li key={item.key} className="results_item">
                <BookResult
                  item={item}
                  action="add"
                  addBook={props.addBook}
                  isInBooks={props.books.map(book => book.data).includes(item)} />
              </li>
            ))}
          </ul>
          <ReactPaginate
            pageCount={props.pageCount}
            onPageChange={props.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'} />
          {props.addingBook &&
            <SpinesGenerator data={props.addingBook} handleAdd={props.addSpine} cancelAdd={props.cancelAdd} />
          }
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