import { Exclude, Expose } from 'class-transformer';
import { Status } from '../../enums';

@Exclude()
export class TransactionDTO {
  @Expose()
  readonly transactionId: string;

  @Expose()
  readonly origin: string;

  @Expose()
  readonly destination: string;

  @Expose()
  readonly amount: number;

  @Expose()
  readonly status: Status;

  @Expose()
  readonly createdAt: Date;
}
