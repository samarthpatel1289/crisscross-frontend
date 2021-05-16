import React from 'react';
import './App.css';
import Grid from './Grid'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Home } from './home';



function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route path = "/" component = {Home} exact />
          <Route path = "/game" component = {Grid} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
