import { Request, Response, NextFunction } from 'express';
import { CustomResponse } from '../lib';
import { healthService } from '../services';

const getHealthStatus = (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthStatus = healthService.getHealthStatus();
    res.send(new CustomResponse(true, healthStatus));
  } catch (err) {
    next(err);
  }
};

export const healthController = { getHealthStatus };
