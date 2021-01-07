import React, { Component } from 'react';

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {}
    };
  }

  render() {
    return (
      <div className="bookshelf">
        <h2>Your bookshelf</h2>
        <ul className="bookshelf_list"></ul>
      </div>
    );
  }
}

export default Bookshelf;