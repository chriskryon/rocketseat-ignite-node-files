import { knex as setupKnex, type Knex } from 'knex';
import 'dotenv/config';

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DATABASE_URL as string,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const knex = setupKnex(config);
