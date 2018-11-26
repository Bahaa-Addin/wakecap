import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./state";
import {getUser} from "./helpers";

import {Login} from "./components/login";
import {Main} from "./containers/main";
import {Workers} from "./containers/workers"

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" render={props => (
                getUser()
                  ? <Redirect to={{pathname: '/workers', state: {from: props.location}}}/>
                  : <Login {...props} />
              )}
              />
              <Main>
              <Route exact path="/workers" render={props => (
                getUser()
                  ? <Workers />
                  : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
              )}
              />
                </Main>
              <Redirect to="/workers"/>
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
