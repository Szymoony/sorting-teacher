import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Display from "./components/Display";
import Home from "./components/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "main"
    };
  }
  render() {
    let display_type = null;
    let {mode} =  this.state;
    if (mode === "main") {
      display_type = <Home />
    } else if (mode === "teaching") {
      display_type = <Display />
    }
    return (
      <div className="App">
        <Navigation onClick={function(id) {
          if (id === 0) {
            this.setState({
              mode: "main"
            });
          } else {
            this.setState({
              mode: "teaching"
            });
          }
        }.bind(this)} />
        {display_type}
      </div>
    );
  }
}

export default App;
