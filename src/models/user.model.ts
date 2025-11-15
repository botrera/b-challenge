import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SessionModel } from '.';

@Table({
  modelName: 'user',
  scopes: {
    onlyData: {
      attributes: { exclude: ['password', 'verifyEmailToken'] },
    },
  },
  paranoid: true,
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  public userId: number;

  @Column({
    unique: true,
  })
  public email: string;

  @Column({
    type: DataType.STRING,
  })
  public firstName: string;

  @Column({
    type: DataType.STRING,
  })
  public lastName: string;

  @Column({
    type: DataType.STRING,
  })
  public phone: string;

  @Column({
    type: DataType.STRING,
  })
  public password: string;

  @Column({
    type: DataType.STRING,
  })
  public birthdate: Date;

  @Column({
    type: DataType.STRING,
  })
  public country: string;

  @Column({
    type: DataType.STRING,
  })
  public city: string;

  @Column({
    type: DataType.STRING,
  })
  public address: string;

  @Column({
    type: DataType.STRING,
  })
  public emailIsVerified: boolean;

  @Column({
    type: DataType.STRING,
  })
  public verifyEmailToken: string;

  @Column({
    type: DataType.STRING,
  })
  public perfilePictureUrl: string;

  @Column({
    type: DataType.DATE,
  })
  public deletedAt: Date;

  @HasMany(() => SessionModel, 'user_id')
  public sessions: SessionModel[];
}

export default UserModel;
