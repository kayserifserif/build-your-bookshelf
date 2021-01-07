import React, { Component } from 'react';
import Book from './Book';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_searched: false,
      query: "",
      query_type: "all",
      results: {}
    };

    this.api_url = "https://openlibrary.org/search.json?";

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  render() {
    return (
      <div className="search">
        <SearchInput
          query={this.state.query}
          query_type={this.state.query_type}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
        {this.state.has_searched &&
          <SearchResults
            query={this.state.query}
            results={this.state.results}
            handleAdd={this.handleAdd}
            books={this.props.books} />
        }
      </div>
    );
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      has_searched: true,
      results: {}
    });
    const query_type = (this.state.query_type === 'all') ? 'q' : this.state.query_type;
    const url = this.api_url + query_type + '=' + this.state.query;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data });
        console.log(this.state);
      });
  }

  handleAdd(item) {
    this.props.addBook(item);
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
        <input
          type="radio"
          name="query_type"
          value="all"
          id="all"
          checked={props.query_type === "all"}
          onChange={props.handleChange} />
        <label htmlFor="all">All</label>
        <input
          type="radio"
          name="query_type"
          value="title"
          id="title"
          checked={props.query_type === "title"}
          onChange={props.handleChange} />
        <label htmlFor="title">Title</label>
        <input
          type="radio"
          name="query_type"
          value="author"
          id="author"
          checked={props.query_type === "author"}
          onChange={props.handleChange} />
        <label htmlFor="author">Author</label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

function SearchResults(props) {
  if (Object.values(props.results).length >= 1) {
    return (
      <div className="search_results">
        <p>{props.results.numFound} results found for "{props.query}"</p>
        <ul className="results_list">
          {props.results.docs.map((item, i) => (
            <Book key={item.key} item={item}>
              <AddButton
                item={item}
                isAdded={props.books.includes(item)}
                handleAdd={props.handleAdd} />
            </Book>
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

function AddButton(props) {
  if (!props.isAdded) {
    return (
      <button className="addResult" onClick={props.handleAdd.bind(this, props.item)}>Add</button>
    );
  } else {
    return (
      <button className="addResult" disabled>Added</button>
    );
  }
}

export default BookSearch;