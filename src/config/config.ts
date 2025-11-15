export const config = {
  env: process.env.ENV?.toUpperCase(),
  port: parseInt(process.env.PORT) || 3000,
  db: {
    url: process.env.DATABASE_URL,
  }
};
