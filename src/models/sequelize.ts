import { Sequelize } from 'sequelize-typescript';
import { logger } from '../lib';
import { config } from '../config';

let sequelizeInstance: Sequelize;

export const sequelize = () => {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }
  let models = [`${__dirname}/*.model.js`];
  // ugly hack
  const env = config.env;
  if (env === 'LOCAL' || env === 'TEST') {
    models = [`${__dirname}/*.model.ts`];
  }

  sequelizeInstance = new Sequelize(config.db.url, {
    dialect: 'postgres',
    dialectOptions: {
      timezone: 'Etc/GMT0',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    define: {
      underscored: true,
      freezeTableName: true,
    },
    logging: config.db.enableLogs ? (msg) => logger.debug(msg) : false,
    models,
    modelMatch: (filename, member) => {
      return filename.substring(0, filename.indexOf('.model')).replace(/_/g, '') === member.toLowerCase();
    },
  });

  return sequelizeInstance;
};
