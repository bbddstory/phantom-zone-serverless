import '../styles/app.scss';

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loader from '../components/loader';
import Login from './login';
import Register from './register';
import Main from './main';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Loader />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
