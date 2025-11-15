import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'user',
})
export class UserModel extends Model<UserModel> {
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  public userId: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column({
    type: DataType.STRING,
  })
  public name: string;

  @Column({ allowNull: false })
  public balance: number;
}

export default UserModel;
