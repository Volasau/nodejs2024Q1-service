import { DataSource } from 'typeorm';
import { database } from './ormconfig';

export const dataSource = new DataSource(database);
