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
  modelName: 'restore_password',
  paranoid: true,
})
export class RestorePasswordModel extends Model<RestorePasswordModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  public restorePasswordId: string;

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
    type: DataType.BOOLEAN,
  })
  public used: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
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

export default RestorePasswordModel;
