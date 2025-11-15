import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
import { logger } from '.';
import { config } from '../config';
import { sequelize } from '../models';

const sequelizeConfig = sequelize();

const umzugMigrations = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
    resolve: ({ name, path, context }) => {
      const migration = require(path || '');
      return {
        name,
        up: async () => await migration.up(context, Sequelize),
        down: async () => await migration.down(context, Sequelize),
      };
    },
  },
  context: sequelizeConfig.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: sequelizeConfig }),
  logger,
});

const umzugSeeders = new Umzug({
  migrations: {
    glob: config.env === 'PROD' ? 'seeders/prod/*.js' : 'seeders/dev_qa/*.js',
    resolve: ({ name, path, context }) => {
      const seeder = require(path || '');
      return {
        name,
        up: async () => await seeder.up(context, Sequelize),
        down: async () => await seeder.down(context, Sequelize),
      };
    },
  },
  context: sequelizeConfig.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize: sequelizeConfig,
    modelName: 'SequelizeSeeder',
  }),
  logger,
});

export const umzug = { umzugMigrations, umzugSeeders };
