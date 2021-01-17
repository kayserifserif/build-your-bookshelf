// modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import Spine from '../components/Spine';
import Button from '../components/Button';
// assets
import './Bookshelf.css';
import empty_Bookshelf from '../assets/empty_Bookshelf.webp';

/**
 * Bookshelf to which books are added
 */
class Bookshelf extends Component {
  render() {
    let changeEditingLink;
    if (this.props.isEditing) {
      changeEditingLink = <a href="/" className="changeEditingLink">Done</a>;
    } else {
      changeEditingLink = <a href="/edit" className="changeEditingLink">Edit</a>;
    }

    return (
      <div className="bookshelf">
        <h2>Your bookshelf</h2>
        <div className="bookshelf_toolbar">
          {this.props.isEditing &&
            <Button onClick={this.props.clearBooks} disabled={this.props.books.length === 0}>Clear</Button>
          }
          {changeEditingLink}
        </div>
        <ul className="bookshelf_list">
          {this.props.books.map((item, i) => (
            <li key={item.data.cover_i} className="bookshelf_item">
              <Spine
                mode={item.mode} data={item.data}
                cover_url={item.cover_url} colors={item.colors} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  /**
   * Books added to bookshelf
   */
  books: PropTypes.array
};

Bookshelf.defaultProps = {
  books: []
};

export default Bookshelf;