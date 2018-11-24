import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./state";
import {getUser} from "./helpers";

import {Login} from "./components/login";
import {Main} from "./containers/main";

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
              <Route exact path="/workers" render={props => (
                getUser()
                  ? (<Main>
                      <div>Workers</div>
                    </Main>)
                  : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
              )}
              />
              <Redirect to="/workers"/>
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
