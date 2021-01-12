import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Builder from './Builder';
import Spines from './Spines';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Builder /></Route>
        <Route path="/spines"><Spines /></Route>
      </Switch>
    </Router>
  );
}

export default App;
