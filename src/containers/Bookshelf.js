// modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import Spine from '../components/Spine';
import Button from '../components/Button';
// assets
import './Bookshelf.css';
// import empty_Bookshelf from '../assets/empty_Bookshelf.webp';

/**
 * Bookshelf to which books are added
 */
class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewStyle: "visual"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.id;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    let changeEditingLink;
    if (this.props.isEditing) {
      changeEditingLink = <a href="/" className="changeEditingLink">Done</a>;
    } else {
      changeEditingLink = <a href="/edit" className="changeEditingLink">Edit</a>;
    }

    let bookshelfList;
    if (this.state.viewStyle === "visual") {
      bookshelfList = <ul className="bookshelf_list bookshelf--visual">
        {this.props.books.map((item, i) => (
          <li key={item.data.cover_i} className="bookshelf_item">
            <Spine
              mode={item.mode} data={item.data}
              cover_url={item.cover_url} colors={item.colors} />
          </li>
        ))}
      </ul>;
    } else {
      bookshelfList = <ul className="bookshelf_list bookshelf--text">
        {this.props.books.map((item, i) => (
          <li key={item.data.cover_i}>
            {item.data.title}<br></br>
            {item.data.author_name[0]}
          </li>
        ))}
      </ul>;
    }

    return (
      <div className={"bookshelf " + ((this.props.isEditing) ? "bookshelf--editing" : "bookshelf--viewing")}>
        <h2>Your bookshelf</h2>
        <div className="bookshelf_toolbar">
          {this.props.isEditing &&
            <Button onClick={this.props.clearBooks} disabled={this.props.books.length === 0}>Clear</Button>
          }
          <div className="viewOptions">
            <input type="radio" name="viewStyle" id="text"
              checked={this.state.viewStyle === "text"} onChange={this.handleInputChange}></input>
            <label htmlFor="text">Text</label>
            <input type="radio" name="viewStyle" id="visual"
              checked={this.state.viewStyle === "visual"} onChange={this.handleInputChange}></input>
            <label htmlFor="visual">Visual</label>
          </div>
          {changeEditingLink}
        </div>
        {bookshelfList}
      </div>
    );
  }
}

Bookshelf.propTypes = {
  /**
   * Books added to bookshelf
   */
  books: PropTypes.array,
  /**
   * Handler to clear books from bookshelf
   */
  clearBooks: PropTypes.func,
  /**
   * Is the app in editing mode?
   */
  isEditing: PropTypes.bool
};

Bookshelf.defaultProps = {
  books: [],
  clearBooks: e => console.log(e),
  isEditing: false
};

export default Bookshelf;