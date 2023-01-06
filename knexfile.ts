import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      user: process.env.DB_USER,
      password: process.env.DB_SECRET,
      database: process.env.DB_NAME,
    },
  },

  staging: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      user: process.env.DB_USER,
      password: process.env.DB_SECRET,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      user: process.env.DB_USER,
      password: process.env.DB_SECRET,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
