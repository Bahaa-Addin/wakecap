import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import {userReducer,
  workerReducer,
  supervisorReducer} from "./reducers";

// import alert from "./reducers/alert.reducer";

// Combine with other reducers we may add in the future
const reducer = combineReducers({
  user: userReducer,
  worker: workerReducer,
  supervisor: supervisorReducer
  // alert
});

export const store = createStore(reducer, applyMiddleware(thunk, logger));
