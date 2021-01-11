import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Builder from './Builder';
import CoverGenerator from './CoverGenerator';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Builder /></Route>
        <Route path="/covers"><CoverGenerator /></Route>
      </Switch>
    </Router>
  );
}

export default App;
