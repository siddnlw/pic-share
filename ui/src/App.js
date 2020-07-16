import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Album from "./pages/Album";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Route path="/" exact render={props => <Home {...props} />} />
        <Route path="/:id" exact render={props => <Album {...props} />} />
      </Router>
    );
  }
}
