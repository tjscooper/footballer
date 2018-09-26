import React from 'react';

import WeeklyWinnerItem from './WeeklyWinnerItem.jsx';

// StatsWeeklyWinnersList component
export default StatsWeeklyWinnersList = ({ weeklyResults = [] }) => {
  const styles = {};
  return (
    <div className="ui grid">
      { weeklyResults.map(({ week, results }) =>
        <WeeklyWinnerItem key={ week } results={ results } week={ week } />) }
    </div>
  );
};
