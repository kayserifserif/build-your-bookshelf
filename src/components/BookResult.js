// modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Book listing in search results.
 */
class BookResult extends Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  render() {
    let image;
    let actionButton;
    if (this.props.action === "add") {
      image = <img
          className="result_cover"
          src={"http://covers.openlibrary.org/b/olid/" + this.props.item.cover_edition_key + "-M.jpg"}
          alt={"Cover of: " + this.props.item.title} />;
      if (!this.props.isInBooks) {
        actionButton = <button className="result_actionBtn addBook" onClick={this.handleAdd.bind(this, this.props.item)}>Add</button>;
      } else {
        actionButton = <button className="result_actionBtn addBook" disabled>Added</button>;
      }
    } else if (this.props.action === "remove") {
      image = <img
        className="result_cover"
        src={this.props.item.spine}
        alt={"Generated spine of: " + this.props.item.title} />;
      actionButton = <button className="result_actionBtn removeBook" onClick={this.handleRemove.bind(this, this.props.item)}>Remove</button>;
    }

    return (
      <div className="result">
        {image}
        <div className="result_info">
          <p className="result_title">Title: {this.props.item.title}</p>
          <p className="result_author">Author: {Array.isArray(this.props.item.author_name) ? this.props.item.author_name.join(', ') : this.props.item.author_name}</p>
          <p className="result_firstPublished">First published: {this.props.item.first_publish_year}</p>
        </div>
        {actionButton}
      </div>
    );
  }

  handleAdd(item) {
    this.props.addBook(item);
  }

  handleRemove(item) {
    this.props.removeBook(item);
  }
}

// docs

BookResult.propTypes = {
  /**
   * Available action for book
   */
  action: PropTypes.oneOf(['add', 'remove']).isRequired,
  /**
   * Data for book listing
   */
  item: PropTypes.object.isRequired,
  /**
   * Does the book already exist in the bookshelf?
   */
  isInBooks: PropTypes.bool,
  /**
   * Handler for adding book
   */
  addBook: PropTypes.func
};

BookResult.defaultProps = {
  action: 'add',
  isInBooks: false,
  addBook: e => console.log(e)
};

export default BookResult;