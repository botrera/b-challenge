import { ShowMessage } from '../types/generic';
import { ApiError, customErrors } from '../enums';

/**
 * Class for encapsulating API response
 */
export class CustomResponse<T> {
  public data: T;
  public result: boolean; // `true` if error, `false` otherwise
  public errorCode: number; // custom error code
  public message: string; // internal error message
  public showMessage: string | ShowMessage; // error message to display to the final user
  public needUpdate: boolean;

  constructor(result: boolean, data?: T, errorCode?: number) {
    this.data = data;

    if (errorCode === ApiError.Server.GENERIC) {
      this.result = false;
      this.needUpdate = true;
      return;
    }

    this.result = result;
    this.needUpdate = false;

    if (result) {
      this.errorCode = 0;
      this.message = null;
      this.showMessage = null;
      return;
    }

    if (errorCode) {
      this.errorCode = errorCode;
      this.message = customErrors[errorCode].message;
      this.showMessage = customErrors[errorCode].showMessage || this.message;
      return;
    }

    this.errorCode = 1; // default error code
  }
}
