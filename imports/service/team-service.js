import Team from '../model/team.js';
export default class TeamService {

  constructor() {}

  static getTeams(game) {
    return {
      homeTeam: TeamService._parseTeam({
        city: game.gameSchedule.homeTeam.abbr,
        nickname: game.gameSchedule.homeNickname,
        score: !game.score ? 0 : game.score.homeTeamScore.pointTotal,
        teamId: game.gameSchedule.homeTeamId
      }),
      visitorTeam: TeamService._parseTeam({
        city: game.gameSchedule.visitorTeam.abbr,
        nickname: game.gameSchedule.visitorNickname,
        score: !game.score ? 0 : game.score.visitorTeamScore.pointTotal,
        teamId: game.gameSchedule.visitorTeamId
      })
    };
  }

  static _parseTeam({ city, nickname, score, teamId }) {
    return new Team({ city, nickname, score, teamId });
  }
}
