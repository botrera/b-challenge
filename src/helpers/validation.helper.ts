import { Request } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { ApiError } from '../enums';
import { CustomError } from '../lib';

const checkValidations = (req: Request) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    throw new CustomError(ApiError.Server.PARAMS_REQUIRED, { data: errors.array() });
  }
};

export const validationHelper = {
  checkValidations,
};
