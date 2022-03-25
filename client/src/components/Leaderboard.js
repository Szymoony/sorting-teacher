// Credit https://github.com/CGally/react-leaderboard
import React, { Component } from 'react';
import '../assets/Leaderboard.css';
import Table from 'react-bootstrap/Table';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function LeaderboardNavbar(props) {
  const left = '<<';
  const right = '>>';
  return (
    <ButtonToolbar className='lbNavbar'>
      <ButtonGroup>
        <Button variant='secondary' onClick={props.handleLeft}>
          {left}
        </Button>
        <Button variant='secondary' onClick={props.handleRight}>
          {right}
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

/**
 * @class Leaderboard
 * @desc Compares the score property of each user object
 * @param {Prop} users-an array of objects with name and score properties
 * @param {Prop} paginate-integer to determine how many users to display on each page
 */
class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.sortUsersByScore = this.sortUsersByScore.bind(this);
    this.sortUsersByName = this.sortUsersByName.bind(this);
    this.filterRank = this.filterRank.bind(this);
    this.increasePage = this.increasePage.bind(this);
    this.decreasePage = this.decreasePage.bind(this);

    this.state = {
      users: this.props.users,
      ranking: [],
      asc: false,
      alph: false,
      page: 1,
      pageMax: 1,
      problemSetName: this.props.problemSetName,
    };
  }

  /**
   * @function componentDidMount
   * @desc Sorts users by score then adds a ranking key to each user object when the component loads. Then sets the ranking state
   */
  componentDidMount() {
    const ranking = this.state.users;
    const paginate = this.props.paginate;
    ranking.sort(this.compareScore).reverse();
    ranking.map((user, index) => (user.rank = index + 1));
    ranking.map((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
    this.setState({ pageMax: ranking[ranking.length - 1].page });
    this.setState({ ranking: ranking });
  }

  /**
   * @function compareScore
   * @desc Compares the score property of each user object
   * @param {Object, Object} user
   */
  compareScore(a, b) {
    if (a.score < b.score) return -1;
    if (a.score > b.score) return 1;
    return 0;
  }

  /**
   * @function compareName
   * @desc Compares the name property of each user object alphabetically
   * @param {Object, Object} user
   */
  compareName(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }

  /**
   * @function sortUsersByScore
   * @desc Sorts the ranking by score either ascending or descending
   */
  sortUsersByScore() {
    const ranking = this.state.ranking;
    const paginate = this.props.paginate;
    if (this.state.asc === true) {
      ranking.sort(this.compareScore).reverse();
      ranking.map((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
      this.setState({ ranking: ranking });
      this.setState({ asc: false });
      this.setState({ alph: false });
    } else {
      ranking.sort(this.compareScore);
      ranking.map((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
      this.setState({ ranking: ranking });
      this.setState({ asc: true });
      this.setState({ alph: false });
    }
  }

  /**
   * @function sortUsersByName
   * @desc Sorts the ranking by name alphabetically either ascending or descending
   */
  sortUsersByName() {
    const ranking = this.state.ranking;
    const paginate = this.props.paginate;
    if (this.state.alph === true) {
      ranking.sort(this.compareName).reverse();
      ranking.map((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
      this.setState({ ranking: ranking });
      this.setState({ alph: false });
      this.setState({ asc: true });
    } else {
      ranking.sort(this.compareName);
      ranking.map((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
      this.setState({ ranking: ranking });
      this.setState({ alph: true });
      this.setState({ asc: true });
    }
  }

  /**
   * @function filterRank
   * @desc Filters through the ranking to find matches and sorts all matches by score
   * @param {String} search input
   */
  filterRank(e) {
    const ranking = this.state.users;
    const paginate = this.props.paginate;
    const newRanking = [];
    const inputLength = e.target.value.length;
    for (var i = 0; i < ranking.length; i++) {
      const str = ranking[i].name.slice(0, inputLength).toLowerCase();
      if (str === e.target.value.toLowerCase()) {
        newRanking.push(ranking[i]);
      }
    }
    newRanking.sort(this.compareScore).reverse();
    newRanking.map((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
    this.setState({ ranking: newRanking });
    this.setState({ page: 1 });
    this.setState({ pageMax: newRanking[newRanking.length - 1].page });
  }

  /**
   * @function increasePage
   * @desc Increments page by one
   * @param {Event} Click
   */
  increasePage(e) {
    let page = this.state.page;
    if (page < this.state.pageMax) {
      page += 1;
    }
    this.setState({ page: page });
  }

  /**
   * @function increasePage
   * @desc Decrements page by one
   * @param {Event} Click
   */
  decreasePage(e) {
    let page = this.state.page;
    if (page > 1) {
      page -= 1;
    }
    this.setState({ page: page });
  }

  /**
   * @function render
   * @desc renders jsx
   */
  render() {
    const nameInput = (
      <form onChange={this.filterRank}>
        <input id='nameInput' type='search' name='search' placeholder='Search by name' />
      </form>
    );
    return (
      <div>
        <Table id='lBoard' striped bordered hover>
          <thead>
            <tr>
              <td colSpan='10000'>
                <div id='lbTitleContainer'>
                  <h2 id='lbTitle'>{this.state.problemSetName + ' - Leaderboard'}</h2>
                  {nameInput}
                </div>
              </td>
            </tr>
            <tr>
              <th className='rank-header sortScore' onClick={this.sortUsersByScore}>
                {' '}
                Rank{' '}
              </th>
              <th className='rank-header sortAlpha' onClick={this.sortUsersByName}>
                {' '}
                Name{' '}
              </th>
              <th className='rank-header' onClick={this.sortUsersByScore}>
                {' '}
                Score{' '}
              </th>
            </tr>
          </thead>
          <tbody className='ranking'>
            {this.state.ranking.map((user, index) => (
              <tr className='ranking' key={index}>
                {user.page === this.state.page ? <td className='data'>{user.rank}</td> : null}
                {user.page === this.state.page ? <td className='data'>{user.name}</td> : null}
                {user.page === this.state.page ? <td className='data'>{user.score}</td> : null}
              </tr>
            ))}
          </tbody>
        </Table>
        <LeaderboardNavbar handleLeft={this.decreasePage} handleRight={this.increasePage}></LeaderboardNavbar>
      </div>
    );
  }
}
export default Leaderboard;
