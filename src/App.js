import React from 'react';
import AddBooks from './AddBooks';
import Bookshelf from './Bookshelf';

function App() {
  return (
    <div>
      <h1>Build Your Bookshelf</h1>
      <main className="main">
        <AddBooks />
        <Bookshelf />
      </main>
    </div>
  );
}

export default App;
