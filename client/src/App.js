import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "../src/components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Notification from "./components/layout/Notification";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Confirmation from "./components/auth/Confirmation";
import Calendar from "./components/calendar/Calendar";
import Event from "./components/event/Event";
import ViewEvent from "./components/event/ViewEvent";
import NotFound from "./components/not-found/NotFound";

import "react-notifications-component/dist/theme.css";
import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decodedUserData = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedUserData));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decodedUserData.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="body-container container">
              <Notification />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/confirmation/:token"
                component={Confirmation}
              />
              <Route exact path="/invitation/:token" component={ViewEvent} />
              <Switch>
                <PrivateRoute exact path="/" component={Calendar} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/event/:id" component={Event} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
