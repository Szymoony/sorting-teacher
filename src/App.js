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
      mode: "single"
    };
  }

  render() {
    let display_type = null;
    const mode = this.state.mode;
    switch (mode) {
      case "main":
        display_type = <Home />;
        break;
      case "single":
        display_type = <SinglePlay />;
        break;
      case "problemSet":
        display_type = <ProblemSet />;
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <Navigation onClick={function (id) {
          switch (id) {
            case 0:
              this.setState({ mode: "main" });
              break;
            case 1:
              this.setState({ mode: "single" });
              break;
            case 2:
              this.setState({ mode: "problemSet" });
              break;
            default:
              break;
          }
        }.bind(this)} />
        {display_type}
      </div>
    );
  }
}

export default App;
