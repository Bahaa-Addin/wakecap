import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import {
  userReducer,
  workerReducer,
  supervisorReducer,
  layoutReducer,
  alertReducer
} from "./reducers";

const reducer = combineReducers({
  user: userReducer,
  worker: workerReducer,
  supervisor: supervisorReducer,
  layout: layoutReducer,
  alert: alertReducer
});

export const store = createStore(reducer, applyMiddleware(thunk, logger));
