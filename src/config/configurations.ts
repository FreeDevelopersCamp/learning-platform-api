export default () => ({
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || 5432,
    url: process.env.MONGO_URL,
    name: process.env.DATABASE_NAME,
  },
  time: {
    zone: process.env.TZ,
    format: process.env.DATE_FORMAT,
  },
  cors: {
    whitelist: process.env.WHITE_LIST,
  },
  security: {
    jwtsecretkey: process.env.JWT_SECRET_KEY,
    tokenexpiration: process.env.TOKEN_EXPIRATION,
    saltrounds: parseInt(process.env.SALT_ROUNDS),
  },
});
