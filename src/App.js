// modules
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import Header from './components/Header';
import Builder from './containers/Builder';
import Spines from './containers/Spines';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Switch>
          <Route exact path="/"><Builder /></Route>
          <Route path="/spines"><Spines /></Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
