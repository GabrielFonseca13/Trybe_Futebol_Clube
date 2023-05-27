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
  goalsBalance: number,
  efficiency: string,
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
      goalsBalance: 0,
      efficiency: '',
    };
    return defaultStatsTeam;
  }

  public static insertHomeTeamStats(team:TeamAttributes, matches: MatchAttributes[]) {
    const teamStats = this.statsTeam();
    teamStats.name = team.teamName;
    matches.forEach((match: MatchAttributes) => {
      if (team.id === match.homeTeamId) {
        teamStats.totalGames += 1; teamStats.goalsFavor += match.homeTeamGoals;
        teamStats.goalsOwn += match.awayTeamGoals;
        teamStats.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) {
          teamStats.totalPoints += 3; teamStats.totalVictories += 1;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          teamStats.totalPoints += 1; teamStats.totalDraws += 1;
        } else teamStats.totalLosses += 1;
      }
    });
    const allStatsTeam = LeaderBoardService.getPerformance(teamStats);
    return allStatsTeam;
  }

  public static insertAwayTeamStats(team:TeamAttributes, matches: MatchAttributes[]) {
    const teamStats = this.statsTeam();
    teamStats.name = team.teamName;
    matches.forEach((match: MatchAttributes) => {
      if (team.id === match.awayTeamId) {
        teamStats.totalGames += 1; teamStats.goalsFavor += match.awayTeamGoals;
        teamStats.goalsOwn += match.homeTeamGoals;
        teamStats.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
        if (match.awayTeamGoals > match.homeTeamGoals) {
          teamStats.totalPoints += 3; teamStats.totalVictories += 1;
        } else if (match.awayTeamGoals === match.homeTeamGoals) {
          teamStats.totalPoints += 1; teamStats.totalDraws += 1;
        } else teamStats.totalLosses += 1;
      }
    });
    const allStatsTeam = LeaderBoardService.getPerformance(teamStats);
    return allStatsTeam;
  }

  public static async getHomePerformance() {
    const allTeams: TeamAttributes[] = await TeamModel.findAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });
    const allTeamsStatusArr: TeamPerformance[] = [];
    allTeams.forEach((team: TeamAttributes) => {
      const teamData = LeaderBoardService.insertHomeTeamStats(team, allMatches);
      allTeamsStatusArr.push(teamData);
    });
    const classification = LeaderBoardService.sortTeamsClassification(allTeamsStatusArr);
    return classification;
  }

  public static async getAwayPerformance() {
    const allTeams: TeamAttributes[] = await TeamModel.findAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });
    const allTeamsStatusArr: TeamPerformance[] = [];
    allTeams.forEach((team: TeamAttributes) => {
      const teamData = LeaderBoardService.insertAwayTeamStats(team, allMatches);
      allTeamsStatusArr.push(teamData);
    });
    const classification = LeaderBoardService.sortTeamsClassification(allTeamsStatusArr);
    return classification;
  }

  public static getPerformance(teamStats: TeamPerformance) {
    const performance = ((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100);
    return { ...teamStats, efficiency: performance.toFixed(2) };
  }

  public static sortTeamsClassification(arrTeamStatus: TeamPerformance[]) {
    const classification = arrTeamStatus.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;

      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;

      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;

      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;

      return 0;
    });
    return classification;
  }
}

export default LeaderBoardService;
