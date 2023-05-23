import TeamModel, { TeamAttributes } from '../database/models/TeamModel';

class TeamService {
  public static async findAll(): Promise<TeamAttributes[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  public static async findById(id: number): Promise<TeamAttributes | null> {
    const team = await TeamModel.findOne({ where: { id } });
    if (!team) return null;
    return team;
  }
}

export default TeamService;
