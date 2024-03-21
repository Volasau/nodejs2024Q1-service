import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export const database: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST as string,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_DB as string,
  entities: ['dist/**/*.entity.js'],
  migrations: [''],
  logging: true,
  migrationsRun: true,
};