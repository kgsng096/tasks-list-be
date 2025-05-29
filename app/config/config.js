require("dotenv").config();

module.exports = {
  development: {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.DIALECT,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialectOptions: {
      useUTC: true,
    },
    define: {
      timestamps: true,
    },
    pool: {
      max: Number(process.env.POOL_MAX),
      min: Number(process.env.POOL_MIN),
      acquire: Number(process.env.POOL_ACQUIRE),
      idle: Number(process.env.POOL_IDLE),
      evict: Number(process.env.POOL_EVICTION),
    },
  },
};
