import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
	host: config.host,
	database: config.db,
	user: config.user,
	password: config.password,
	port: parseInt(config.dbport as string),
});

export default pool;
