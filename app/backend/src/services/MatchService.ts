import TeamModel from '../database/models/TeamModel';
import MatchModel, { MatchAttributes, MatchGoals } from '../database/models/MatchModel';

class MatchService {
  public static async findAll(): Promise<MatchAttributes[]> {
    const matches = await MatchModel.findAll({
      include: [{
        model: TeamModel,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      {
        model: TeamModel,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  }

  public static async findAllInProgress(inProgress: boolean): Promise<MatchAttributes[]> {
    const matches = await MatchModel.findAll({
      where: { inProgress },
      include: [{
        model: TeamModel,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      {
        model: TeamModel,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  }

  public static async findMatchById(id: number): Promise<MatchAttributes | null> {
    const match = await MatchModel.findOne({ where: { id } });
    if (!match) return null;
    return match;
  }

  public static async finishMatch(id: number): Promise<void> {
    await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public static async changeScores(id: number, match: MatchGoals): Promise<void> {
    await MatchModel.update(
      {
        homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
      },
      { where: { id } },
    );
  }
}

export default MatchService;
