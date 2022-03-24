import React, { Component } from 'react';
import Leaderboard from './Leaderboard.js';

class Leaders extends Component {
  constructor(props) {
    super(props);
    // for now scores are randomly generated
    this.state = {
      users: [{name: "string", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},
              {name: "denis", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},
              {name: "string", score: this.generateItems(1)},],
      paginate: 10  // number of usernames per page
    };
  }

  generateItems(n) {
    const items = [];
    for (let i = 1; i <= n; i++) {
      let elemValue = Math.floor(Math.random() * 49 + 1);
      items.push(elemValue);
    }
    if (items.length === 1) {
      return items[0];
    }
    return items;
  }

  render() {
    return (
      <div>
        <Leaderboard users={this.state.users} paginate={this.state.paginate} problemSetName={"ProblemSet1"}/>
      </div>
    );
  }
}

export default Leaders;
