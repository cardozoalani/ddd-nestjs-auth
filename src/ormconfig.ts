import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import * as DotEnv from 'dotenv'
DotEnv.config()
export const ORMConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'pg_db',
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: true,
}
