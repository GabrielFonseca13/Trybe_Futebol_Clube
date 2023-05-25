import TeamModel from '../database/models/TeamModel';
import MatchModel, { MatchAttributes } from '../database/models/MatchModel';

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
}

export default MatchService;
