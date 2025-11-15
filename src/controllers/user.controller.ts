import * as path from 'path';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../enums';
import { CustomError, CustomResponse } from '../lib';
import { userService } from '../services';
import { validationHelper, parseObjectHelper } from '../helpers';

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals.userId != req.params.userId && !res.locals.isAdmin) {
      return next(new CustomError(ApiError.Auth.UNAUTHORIZED));
    }

    const user = await userService.getUserById(req.params.userId);

    res.send(new CustomResponse(true, user));
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getUserById,
};
