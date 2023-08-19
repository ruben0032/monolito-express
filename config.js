module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  sequelize: {
    host: process.env.SEQ_HOST || 'localhost',
    user: process.env.SEQ_USER || 'postgres',
    password: process.env.SEQ_PASS || 'post4u',
    database: process.env.SEQ_DB || 'api_matriz',
  },
};
