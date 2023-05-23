import TeamModel, { TeamAttributes } from '../database/models/TeamModel';

class TeamService {
  public static async findAll(): Promise<TeamAttributes[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }
}

//   async getAllTeams(): Promise<ITeam[]> {
//     const result = await this._teamModel.findAll();
//     return result;
//   }
// }

export default TeamService;
