import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '.';

@Table({
  modelName: 'session',
  paranoid: true,
})
export class SessionModel extends Model<SessionModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  public sessionId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public token: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public expiredAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public deletedAt: Date;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
  })
  public userId: number;
  @BelongsTo(() => UserModel, 'user_id')
  public user: UserModel;
}

export default SessionModel;
