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

  // public static async findById(id: number): Promise<MatchAttributes | null> {
  //   const Match = await MatchModel.findOne({ where: { id } });
  //   if (!Match) return null;
  //   return Match;
  // }
}

export default MatchService;
