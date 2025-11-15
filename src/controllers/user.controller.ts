import * as path from 'path';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../enums';
import { CustomError, CustomResponse } from '../lib';
import { userService } from '../services';
import { validationHelper, parseObjectHelper } from '../helpers';

const renderRestorePassword = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendFile(path.resolve(__dirname, '../static/forgot_pwd', 'index.html'));
  } catch (err) {
    next(err);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validationHelper.checkValidations(req);

    const userData = parseObjectHelper.parseToUserSignupRequest(req.body);

    const user = await userService.createUser(userData);
    res.send(new CustomResponse(true, user));
  } catch (err) {
    next(err);
  }
};

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

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals.userId != req.params.userId && !res.locals.isAdmin) {
      return next(new CustomError(ApiError.Auth.UNAUTHORIZED));
    }

    const user = parseObjectHelper.parseToUserUpdateRequest(req.body);

    const userUpdated = await userService.updateUser(req.params.userId, user);

    res.json(new CustomResponse(true, userUpdated));
  } catch (error) {
    next(error);
  }
};

/* eslint-disable dot-notation, @typescript-eslint/dot-notation */
const uploadProfilePic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { files } = req;

    if (!files) {
      throw new CustomError(ApiError.Server.PARAMS_REQUIRED);
    }

    const user = await userService.updateUser(userId, {
      profilePictureUrl: files['photo'][0].location,
    });

    res.send(new CustomResponse(true, user));
  } catch (err) {
    next(err);
  }
};
/* eslint-enable dot-notation, @typescript-eslint/dot-notation */


export const userController = {
  renderRestorePassword,
  signup,
  getUserById,
  updateUser,
  uploadProfilePic,
};
