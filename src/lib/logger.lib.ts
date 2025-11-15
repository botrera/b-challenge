import httpContext from 'express-http-context';
import pino from 'pino';
import { CustomError } from './custom_error.lib';

const mixin = () => {
  return {
    traceId: httpContext.get('traceId'),
    userId: httpContext.get('userId'),
    userEmail: httpContext.get('userEmail'),
  };
};

export const logger = pino({
  level: 'trace',
  base: null,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  nestedKey: 'data',
  mixin,
  serializers: {
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
