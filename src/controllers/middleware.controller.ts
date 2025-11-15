import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import { v4 as uuidv4 } from 'uuid';

const setTrace = (req: Request, res: Response, next: NextFunction) => {
  if (req.path == '/health') {
    return next();
  }

  httpContext.set('traceId', uuidv4());

  return next();
};

export const middlewareController = { setTrace };
