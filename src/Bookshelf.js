import React, { Component } from 'react';
import SpineCanvas from './SpineCanvas';

import empty_Bookshelf from './img/empty_Bookshelf.webp';

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
              <SpineCanvas
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

export default Bookshelf;