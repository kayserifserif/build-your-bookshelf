// modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import Spine from '../components/Spine';
// assets
import './Bookshelf.css';
import empty_Bookshelf from '../assets/empty_Bookshelf.webp';

/**
 * Bookshelf to which books are added
 */
class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2>Your bookshelf</h2>
        {/*<ul className="bookshelf_list bookList">*/}
        <ul className="bookshelf_bookshelf">
          {this.props.books.map((item, i) => (
            <li key={item.data.cover_i} className="bookshelf_bookSpine">
              {/*<Book
                item={item}
                action="remove"
                removeBook={this.props.removeBook} />*/}
              <Spine
                className="spineCanvas"
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