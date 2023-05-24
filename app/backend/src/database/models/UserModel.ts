import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';

export interface UserAttributes {
  id: number;
  userName: string;
  role: string;
  email: string;
  password: string;
}

export type UserCreationalAttributes = Optional<UserAttributes, 'id'>;

class UserModel extends Model<UserAttributes, UserCreationalAttributes> implements UserAttributes {
  declare id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'user_name',
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

export default UserModel;
