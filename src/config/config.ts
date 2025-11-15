export const config = {
  env: process.env.ENV?.toUpperCase(),
  port: parseInt(process.env.PORT) || 3000,
  apiEndpoint: process.env.API_ENDPOINT,
  sentryUri: process.env.SENTRY_URI,
  baseUrlFront: process.env.BASE_URL_FRONT,
  frontDomain: process.env.FRONT_DOMAIN,
  logger: {
    level: process.env.LOG_LEVEL || 'trace', // Minimum logging level. trace = log everything
  },
  db: {
    url: process.env.DATABASE_URL,
    enableLogs: process.env.DB_ENABLE_LOGS === 'true',
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    newUser: process.env.TEMPLATE_ID_NEW_USER,
    forgotPwd: process.env.TEMPLATE_ID_FORGOT_PWD,
  },
  aws: {
    region: process.env.AWS_REGION,
    identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
    s3bucketName: process.env.AWS_S3_BUCKET_NAME,
  },
};
