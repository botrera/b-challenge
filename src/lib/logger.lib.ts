import httpContext from 'express-http-context';
import pino from 'pino';
import { config } from '../config';
import { CustomError } from './custom_error.lib';

// Data to be included in every log
const mixin = () => {
  return {
    traceId: httpContext.get('traceId'),
    userId: httpContext.get('userId'),
    userEmail: httpContext.get('userEmail'),
  };
};

export const logger = pino({
  level: config.logger.level, // Minimum logging level. trace = log everything
  base: null, // don't add pid & hostname to logs
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: ['LOCAL', 'TEST'].includes(config.env),
    },
  },
  nestedKey: 'data', // Key to place any logged object under
  mixin,
  serializers: {
    // Needed because errors don't get serialized when using nestedKey
    /* eslint-disable */
    data: (data: any | Error) => {
      if (data instanceof Error || data instanceof CustomError) {
        return { err: pino.stdSerializers.err(data) };
      }

      if (data.err) {
        data.err = pino.stdSerializers.err(data.err);
      }

      return data;
    },
  },
});
