import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const initialState = {};

const middleware = [thunk];

let executeCompose = compose(applyMiddleware(...middleware));

// use redux only for development and if it has redux extension installed
if (
  process.env.NODE_ENV &&
  process.env.NODE_ENV === "development" &&
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
) {
  executeCompose = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const store = createStore(rootReducer, initialState, executeCompose);

export default store;
