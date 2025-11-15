import { customErrors } from '../enums';

export class CustomError<T extends object> extends Error {
  public errorCode: number;
  public data: T;
  public type: string;
  public message: string;
  public statusCode: number;
  readonly errorName: string;

  constructor(errorCode: number, data?: T) {
    super(customErrors[errorCode].message);
    this.errorCode = errorCode;
    this.data = data;
    this.type = customErrors[errorCode].type;
    this.message = customErrors[errorCode].message;
    this.statusCode = customErrors[errorCode].HTTPStatusCode;
    this.errorName = customErrors[errorCode].errorName;
  }
}
