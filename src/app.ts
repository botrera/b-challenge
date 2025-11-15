import express from 'express';
import httpContext from 'express-http-context';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';
import { config } from './config';
import { customErrors } from './enums';
import { v1 } from './routes';
import { sequelize } from './models';
import { CustomError, CustomResponse, logger } from './lib';
import './sentry';

const exceptionMiddleware = <T extends Error>(err: T, req: Request, res: Response, _next: NextFunction) => {
  Sentry.captureException(err);

  if (err instanceof CustomError) {
    logger.info({ err }, 'api_error');
    const httpStatus = customErrors[err.errorCode] && customErrors[err.errorCode].HTTPStatusCode;
    return res.status(httpStatus || 500).send(new CustomResponse(false, err.data, err.errorCode));
  }

  logger.error(err);
  res.status(500);

  return res.send(new CustomResponse(false));
};

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.server.use(httpContext.middleware);
    this.configureLogging();
    this.configureMiddleware();
    this.configureRoutes();
  }

  public async connectToDatabase() {
    try {
      await sequelize().authenticate();
      logger.info('database_connection_succesful');
    } catch (error) {
      logger.error(error, 'database_connection_failed');
      throw error;
    }
  }

  private configureLogging() {
    const format = config.env === 'LOCAL' ? 'dev' : 'tiny';
    const httpLogger = morgan(
      format,
      {
        skip: (req: Request, res: Response) =>  req.baseUrl === '/api/v1/health',
      },
    );
    this.server.use(httpLogger);
  }

  private configureMiddleware() {
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(helmet()); // for security purposes
    this.server.use(
      cors({
        credentials: true,
        origin: config.baseUrlFront,
      }),
    ); // enable all CORS Requests
    this.server.use(cookieParser());

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    this.server.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    this.server.use(Sentry.Handlers.tracingHandler());
  }

  private configureRoutes() {
    this.server.use('/api/v1', v1);
    // catch 404 and forward to error handler
    this.server.use((req: Request, res: Response) => {
      res.status(404);
      res.send(new CustomResponse(false));
    });
    this.server.use(exceptionMiddleware);
  }
}
