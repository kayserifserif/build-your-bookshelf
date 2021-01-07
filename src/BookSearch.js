import React, { Component } from 'react';
import Book from './Book';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      query: "",
      queryType: "all",
      results: {}
    };

    this.api_url = "https://openlibrary.org/search.json?";

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
            books={this.props.books}
            addBook={this.props.addBook} />
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
    this.setState({
      showResults: true,
      results: {}
    });
    const queryType = (this.state.queryType === 'all') ? 'q' : this.state.queryType;
    const url = this.api_url + queryType + '=' + this.state.query;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data });
        console.log(this.state);
      });
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
    <div>
      <input
        type="radio"
        name="queryType"
        value={props.value.toLowerCase()}
        id={props.value.toLowerCase()}
        checked={props.queryType === props.value.toLowerCase()}
        onChange={props.onChange} />
      <label htmlFor={props.value.toLowerCase()}>{props.value}</label>
    </div>
  );
}

function SearchResults(props) {
  if (Object.values(props.results).length >= 1) {
    return (
      <div className="search_results">
        <p>{props.results.numFound} results found for "{props.query}"</p>
        <ul className="results_list bookList">
          {props.results.docs.map((item, i) => (
            <li key={item.key}>
              <Book
                key={item.key}
                item={item}
                action="add"
                addBook={props.addBook}
                isInBooks={props.books.includes(item)} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="search_results">
        <p>Loading results for "{props.query}"...</p>
      </div>
    );
  }
}

export default BookSearch;