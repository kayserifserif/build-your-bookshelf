import React, { Component } from 'react';

class Book extends Component {
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
          className="book_cover"
          src={"http://covers.openlibrary.org/b/olid/" + this.props.item.cover_edition_key + "-M.jpg"}
          alt={"Cover of: " + this.props.item.title} />;
      if (!this.props.isInBooks) {
        actionButton = <button className="book_actionBtn addBook" onClick={this.handleAdd.bind(this, this.props.item)}>Add</button>;
      } else {
        actionButton = <button className="book_actionBtn addBook" disabled>Added</button>;
      }
    } else if (this.props.action === "remove") {
      image = <img
        className="book_cover"
        src={this.props.item.spine}
        alt={"Generated spine of: " + this.props.item.title} />;
      actionButton = <button className="book_actionBtn removeBook" onClick={this.handleRemove.bind(this, this.props.item)}>Remove</button>;
    }

    return (
      <div className="book">
        {image}
        <div className="book_info">
          <p className="book_title">Title: {this.props.item.title}</p>
          <p className="book_author">Author: {Array.isArray(this.props.item.author_name) ? this.props.item.author_name.join(', ') : this.props.item.author_name}</p>
          <p className="book_firstPublished">First published: {this.props.item.first_publish_year}</p>
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

export default Book;