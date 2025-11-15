import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { UserModel } from './';
import { Status } from '../enums';

@Table({
  modelName: 'transaction',
})
export class TransactionModel extends Model<TransactionModel> {
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  public transactionId: string;

  @ForeignKey(() => UserModel)
  @Column
  public origin: string;

  @ForeignKey(() => UserModel)
  @Column
  public destination: string;

  @BelongsTo(() => UserModel)
  public user: UserModel;

  @Column({ allowNull: false })
  public amount: number;

  @Column
  public status: Status;
}

export default TransactionModel;
