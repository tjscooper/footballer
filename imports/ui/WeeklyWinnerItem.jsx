import React from 'react';
import _ from 'lodash';

// StatsWeeklyWinnersList component
export default StatsWeeklyWinnerItem = ({ week, results }) => {
  const { winner, loser } = results;
  const styles = {
    week: { marginLeft: 0, paddingLeft: 0 },
    font: {
      fontFamily: '\'Lato\', \'Helvetica Neue\', Arial, Helvetica, sans-serif',
    },
    winner: {
      icon: { fontSize: '24px' },
      value: { fontSize: '24px', textAlign: 'center' },
      label: { textTransform: 'inherit' }
    },
    loser: {
      icon: { fontSize: '24px' },
      value: { fontSize: '24px', textAlign: 'center' },
      label: { textTransform: 'inherit' }
    }
  };
  return (
    <div className="sixteen wide column">
      <div className="ui three statistics" style={ styles.font }>
        <div className="ui mini statistic">
          <div className="label" style={ styles.week }>{ `Week ${ week }` }</div>
        </div>
        <div className="ui mini statistic">
          <div style={ styles.winner.value }>
            <i
              className="thumbs up outline icon green"
              style={ styles.winner.icon }
            ></i>
            { winner.wins }
          </div>
          <div className="label" style={ styles.winner.label }>
            { winner.username }
          </div>
        </div>
        <div className="ui mini statistic">
          <div style={ styles.loser.value }>
            <i
              className="thumbs down outline icon red"
              style={ styles.loser.icon }
            ></i>
            { loser.wins }
          </div>
          <div className="label" style={ styles.loser.label }>
            { loser.username }
          </div>
        </div>
      </div>
    </div>
  );
};
