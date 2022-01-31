import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Display from "./components/Display";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Display />
      </div>
    );
  }
}

export default App;
