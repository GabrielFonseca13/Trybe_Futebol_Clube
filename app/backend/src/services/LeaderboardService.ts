import TeamModel, { TeamAttributes } from '../database/models/TeamModel';
import MatchModel, { MatchAttributes } from '../database/models/MatchModel';

export interface TeamPerformance {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance?: number,
  efficiency?: number,
}

class LeaderBoardService {
  // criar um novo objeto com os atributos default do time
  public static statsTeam(): TeamPerformance {
    const defaultStatsTeam: TeamPerformance = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      // goalsBalance: 0,
      // efficiency: 0,
    };
    return defaultStatsTeam;
  }

  // iterar todas as partidas para pegar todos os dados do time da casa.
  public static insertTeamStats(team:TeamAttributes, matches: MatchAttributes[]) {
    const teamStats = this.statsTeam();
    teamStats.name = team.teamName;
    matches.forEach((match) => {
      if (team.id === match.homeTeamId) {
        teamStats.totalGames += 1;
        teamStats.goalsFavor += match.homeTeamGoals;
        teamStats.goalsOwn += match.awayTeamGoals;
        // teamStats.goalsBalance += (match.homeTeamGoals - match.awayTeamGoals);
        if (match.homeTeamGoals > match.awayTeamGoals) {
          teamStats.totalPoints += 3;
          teamStats.totalVictories += 1;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          teamStats.totalPoints += 1;
          teamStats.totalDraws += 1;
        } else teamStats.totalLosses += 1;
      }
    });
    return teamStats;
  }

  public static async getHomePerformance() {
    const allTeams = await TeamModel.findAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });
    const allTeamsStatusArr: TeamPerformance[] = [];
    allTeams.forEach((team) => {
      const teamData = LeaderBoardService.insertTeamStats(team, allMatches);
      allTeamsStatusArr.push(teamData);
    });
    return allTeamsStatusArr;
  }
}

export default LeaderBoardService;
