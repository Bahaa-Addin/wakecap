import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./state";

import {Main} from "./containers/main";

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Main>
                <Route exact path="/workers" render={() => (<div>Workers</div>)}/>
              </Main>
              <Redirect to="/"/>
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
