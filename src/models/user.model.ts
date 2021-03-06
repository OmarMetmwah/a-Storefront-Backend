import User from '../types/user.types';
import db from '../database';
import config from '../config';
import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
	const salt = parseInt(config.salt as string);
	const pepper = config.pepper;
	return bcrypt.hashSync(password + pepper, salt);
};
class UserModel {
	//create
	async create(user: User): Promise<User> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = `INSERT INTO users(email, username, firstname, lastname, password)
            VALUES($1,$2,$3,$4,$5) RETURNING id, email, username, firstname, lastname`;
			//run query
			const result = await conncection.query(query, [user.email, user.username, user.firstname, user.lastname, hashPassword(user.password)]);
			//release conncetion
			conncection.release();
			//return user
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Create User: ${user.username} because ${(err as Error).message}`);
		}
	}
	//list
	async list(): Promise<User[]> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = 'SELECT id, email, username, firstname, lastname FROM users';
			//run query
			const result = await conncection.query(query);
			//release conncetion
			conncection.release();
			//return user
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot Return Users because ${(err as Error).message}`);
		}
	}
	//get specific
	async getUser(id: string): Promise<User> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = 'SELECT id, email, username, firstname, lastname FROM users WHERE id=($1)';
			//run query
			const result = await conncection.query(query, [id]);
			//release conncetion
			conncection.release();
			//return user
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Find User ${id} because ${(err as Error).message}`);
		}
	}
	//update user
	async updateUser(id: string, user: User): Promise<User> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = `UPDATE users SET email=$1, username=$2, firstname=$3, lastname=$4, password=$5 WHERE id=$6
            RETURNING id, email, username, firstname, lastname`;
			//run query
			const result = await conncection.query(query, [user.email, user.username, user.firstname, user.lastname, hashPassword(user.password), id]);
			//release conncetion
			conncection.release();
			//return user
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Update User ${id} because ${(err as Error).message}`);
		}
	}
	//delete user
	async deleteUser(id: string): Promise<User> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = 'DELETE FROM users WHERE id=($1) RETURNING id, email, username, firstname, lastname;';
			//run query
			const result = await conncection.query(query, [id]);
			//release conncetion
			conncection.release();
			//return user
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Delete User ${id} because ${(err as Error).message}`);
		}
	}
	//authenticate
	async authenticate(username: string, password: string): Promise<User | null> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = 'SELECT password FROM users WHERE username=($1)';
			//run query
			const result = await conncection.query(query, [username]);
			if (result.rows.length) {
				const { password: hashPassword } = result.rows[0];
				const valid = bcrypt.compareSync(password + config.pepper, hashPassword);
				if (valid) {
					const info = await conncection.query('SELECT id, email, username, firstname, lastname FROM users WHERE username=($1)', [username]);
					return info.rows[0];
				}
			}
			//release conncetion
			conncection.release();

			return null;
		} catch (err) {
			throw new Error(`Cannot Login because ${(err as Error).message}`);
		}
	}
}
export default UserModel;
