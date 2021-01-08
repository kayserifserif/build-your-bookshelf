import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Builder from './Builder';
import Covers from './Covers';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Builder /></Route>
        <Route path="/covers"><Covers /></Route>
      </Switch>
    </Router>
  );
}

export default App;
