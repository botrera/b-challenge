import express, { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { customErrors } from './enums';
import { api } from './routes';
import { sequelize } from './models';
import { CustomError, CustomResponse, logger } from './lib';

const exceptionMiddleware = <T extends Error>(err: T, req: Request, res: Response, _next: NextFunction) => {
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
    const httpLogger = morgan('dev', {
      skip: (req: Request, _res: Response) => req.baseUrl === '/api/health',
    });
    this.server.use(httpLogger);
  }

  private configureMiddleware() {
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(helmet());
    this.server.use(
      cors({
        credentials: true,
        origin: '*',
      }),
    );
    this.server.use(cookieParser());
  }

  private configureRoutes() {
    this.server.use('/api', api);
    this.server.use((req: Request, res: Response) => {
      res.status(404);
      res.send(new CustomResponse(false));
    });
    this.server.use(exceptionMiddleware);
  }
}
