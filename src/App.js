import React, { Component } from "react";
import Navigation from "./components/Navigation";
import Display from "./components/Display";
import Home from "./components/Home";
import ProblemSetCreator from "./components/ProblemSetCreator";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "main"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    if (id === 0) {
      this.setState({
        mode: "main"
      });
    } else if (id === 7) {
      this.setState({
        mode: "creating"
      });
    } else {
      this.setState({
        mode: "teaching"
      });
    }
  }

  render() {
    let display_type = null;
    let {mode} =  this.state;
    if (mode === "main") {
      display_type = <Home />
    } else if (mode === "teaching") {
      display_type = <Display />
    } else {
      display_type = <ProblemSetCreator />
    }
    return (
      <div className="App">
        <Navigation onClick={this.handleClick}/>
        {display_type}
      </div>
    );
  }
}

export default App;
