import React, { Component } from 'react';

class AddBooks extends Component {
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
            results={this.state.results} />
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
        <ul className="results_list"></ul>
        {props.results.docs.map((item, i) => (
          <div className="result" key={i}>
            <p className="result_title">Title: {item.title}</p>
            <p className="result_author">Author: {Array.isArray(item.author_name) ? item.author_name.join(', ') : item.author_name}</p>
            <p className="result_firstPublished">First published: {item.first_publish_year}</p>
          </div>
        ))}
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

export default AddBooks;