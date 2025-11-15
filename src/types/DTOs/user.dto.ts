import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDTO {
  @Expose()
  readonly userId: number;

  @Expose()
  readonly email: string;

  @Expose()
  readonly firstName: string;

  @Expose()
  readonly lastName: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly password: string;

  @Expose()
  readonly birthdate: Date;

  @Expose()
  readonly country: string;

  @Expose()
  readonly city: string;

  @Expose()
  readonly address: string;

  @Expose()
  readonly emailIsVerified: boolean;

  @Expose()
  readonly verifyEmailToken: string;

  @Expose()
  readonly profilePictureUrl: string;
}
