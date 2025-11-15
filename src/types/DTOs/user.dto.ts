import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDTO {
  @Expose()
  readonly userId: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly balance: number;

  @Expose()
  readonly createdAt: Date;
}
