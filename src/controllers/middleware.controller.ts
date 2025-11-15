import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import { v4 as uuidv4 } from 'uuid';
import { middlewareService } from '../services';

const userAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await middlewareService.userAuthorization(req, res, next);
  } catch (err) {
    next(err);
  }
};


// Set trace id for every HTTP request to be used in logs
const setTrace = (req: Request, res: Response, next: NextFunction) => {
  if (req.path == '/health') {
    return next();
  }

  httpContext.set('traceId', uuidv4());

  return next();
};

export const middlewareController = { setTrace, userAuthorization };
