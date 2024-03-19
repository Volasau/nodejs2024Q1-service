import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

export default {
  type: 'postgres',
  host: process.env.PG_HOST as string,
  port: parseInt(process.env.PG_PORT) as number,
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_DB as string,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  logging: false,
} as DataSourceOptions;
