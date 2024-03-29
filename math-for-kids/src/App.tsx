import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import ProblemGenerator from './components/problemGenerator/problemGenerator';
import DonatePage from './pages/donatePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/en/music" exact>
          <ProblemGenerator mode="music" lang="en" />
        </Route>
        <Route path="/ru/music" exact>
          <ProblemGenerator mode="music" lang="ru" />
        </Route>
        <Route path="/" exact>
          <ProblemGenerator mode="math" lang="en" />
        </Route>
        <Route path="/donate" exact>
          <DonatePage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
