import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import ProblemGenerator from './components/problemGenerator/problemGenerator';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/music" exact>
          <ProblemGenerator mode="music" />
        </Route>
        <Route path="/" exact>
          <ProblemGenerator mode="math" />
        </Route>
      </Router>
    </div>
  );
}

export default App;
