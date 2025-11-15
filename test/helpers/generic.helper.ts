import { sequelize } from '../../src/models';

const destroyDB = async () => {
  await sequelize().query(`
    TRUNCATE public."transaction" CASCADE;
    TRUNCATE public."user" CASCADE;
`);
};

export const genericHelper = {
  destroyDB,
};
