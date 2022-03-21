import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SinglePlay from "./components/SinglePlay";
import ProblemSet from "./components/ProblemSet";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "single",
    };
  }

  render() {
    let display_type = null;
    const { mode } = this.state;
    if (mode === "main") {
      display_type = <Home />;
    } else if (mode === "single") {
      display_type = <SinglePlay />;
    } else if (mode === "problemSet") {
      display_type = <ProblemSet />;
    }

    return (
      <div className="App">
        <Navigation
          onClick={(id) => {
            if (id === 0) {
              this.setState({ mode: "main" });
            } else if (id === 1) {
              this.setState({ mode: "single" });
            } else if (id === 2) {
              this.setState({ mode: "problemSet" });
            }
          }}
        />
        {display_type}
      </div>
    );
  }
}

export default App;
