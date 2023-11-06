export default {
  database: () => ({
    dialect: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: Number(process.env.MYSQL_DB_PORT),
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
  }),
  jwtPrivateKey: () =>
    (process.env.JWT_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
  google: () => ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  }),
};
