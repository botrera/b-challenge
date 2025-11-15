import { Response, Request, NextFunction } from 'express';
import httpContext from 'express-http-context';
import { v4 as uuidv4 } from 'uuid';
import { UserTypeEnum, ApiError } from '../enums';
import { CustomError } from '../lib';
import { UserDTO } from '../types/DTOs';
import { userService } from '.';

const authorizeRoles = (roles: UserTypeEnum[]) => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const userRole: UserTypeEnum = (UserTypeEnum as any)[res.locals.userType];

      if (roles.length && !roles.includes(userRole)) {
        next(new CustomError(ApiError.Auth.UNAUTHORIZED));
      }

      next();
    },
  ];
};

/**
 * Auth middleware. Loads the user data in res.locals
 */
const userAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  const { authToken }: { authToken: string } = req.cookies;

  if (!authToken) {
    return next();
  }

  const user: UserDTO = await userService.getUserByToken(authToken);
  res.locals.userId = user.userId;
  res.locals.user = user;
  res.locals.token = authToken;
  res.locals.userType = UserTypeEnum.USER;

  // Set context, used later in logs
  httpContext.set('userId', user.userId);
  httpContext.set('userEmail', user.email);

  next();
};

export const middlewareService = { authorizeRoles, userAuthorization };
