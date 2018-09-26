import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import StatsGamesWonLineChartContainer from './StatsGamesWonLineChart.jsx';
import StatsWeeklyWinnersList from './StatsWeeklyWinnersList.jsx';

const StatsGamesWon = new Mongo.Collection('StatsGamesWon');
const StatsWeeklyWinners = new Mongo.Collection('StatsWeeklyWinners');

// Stats component
class Stats extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { gamesWon, weeklyResults } = this.props.stats;

    return (
      <div className="ui grid">
        <div className="sixteen wide column">
          <h4 className="ui horizontal divider header">
            {/* <i className="bar chart icon"></i> */ }
            Total Games Won
          </h4>
        </div>
        <div className="sixteen wide column">
          <StatsGamesWonLineChartContainer stats={ gamesWon } />
        </div>
        <div className="sixteen wide column">
          <h4 className="ui horizontal divider header">
            {/* <i className="bar chart icon"></i> */ }
            Weekly Hi-Lo
          </h4>
        </div>
        <div className="sixteen wide column">
          <StatsWeeklyWinnersList weeklyResults={ weeklyResults } />
        </div>
      </div>
    );
  }

}

export default StatsContainer = createContainer(props => {

  let stats = {
    gamesWon: [],
    weeklyResults: []
  };

  let subs = {
    gamesWon: Meteor.subscribe('stats.games.won', { leagueId: '2018-19' }),
    weeklyWinners: Meteor.subscribe('stats.weekly.winners', { leagueId: '2018-19' })
  };

  if (subs.gamesWon.ready() && subs.weeklyWinners.ready()) {

    const gamesWon = StatsGamesWon.find({}).fetch();
    const weeklyWinners = StatsWeeklyWinners.find({}).fetch();

    const weeklyWinner = ({ data }) => {
      const weekGroupsByUserId = _.groupBy(data, 'userId');
      const winsByUser = _.keysIn(weekGroupsByUserId).reduce((result, key) => {
        const { username, userId } = _.first(weekGroupsByUserId[key]);
        result.push({
          userId,
          username,
          wins: weekGroupsByUserId[userId].length
        });
        return result;
      }, []);
      return {
        winner: _.maxBy(winsByUser, 'wins'),
        loser: _.minBy(winsByUser, 'wins')
      };
    };

    stats = {
      ...stats,
      gamesWon,
      weeklyResults: weeklyWinners.map(week =>
        ({ week: week._id, results: weeklyWinner(week) }))
    };
  }

  return {
    loading: !subs.gamesWon.ready() && !subs.weeklyWinners.ready(),
    stats
  };

}, Stats);
