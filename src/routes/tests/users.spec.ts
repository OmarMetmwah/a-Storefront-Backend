import UserModel from '../../models/user.model';
import db from '../../database';
import User from '../../types/user.types';

const userModel = new UserModel();

describe('User Model', () => {
	describe('Test methods exists', () => {
		it('should have an Get Many Users method', () => {
			expect(userModel.list).toBeDefined();
		});

		it('should have a Get One User method', () => {
			expect(userModel.getUser).toBeDefined();
		});

		it('should have a Create User method', () => {
			expect(userModel.create).toBeDefined();
		});

		it('should have a Update User method', () => {
			expect(userModel.updateUser).toBeDefined();
		});

		it('should have a Delete User method', () => {
			expect(userModel.deleteUser).toBeDefined();
		});

		it('should have an Authenticate User method', () => {
			expect(userModel.authenticate).toBeDefined();
		});
	});

	describe('Test User Model Logic', () => {
		const user: User = {
			username: 'omar_metmwah',
			firstname: 'Omar',
			lastname: 'Metmwah',
			password: 'password123',
			email: 'omar@gmail.com',
		};

		beforeAll(async () => {
			const createdUser = await userModel.create(user);
			user.id = createdUser.id;
		});

		afterAll(async () => {
			const connection = await db.connect();
			const sql = 'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;';
			await connection.query(sql);
			connection.release();
		});

		it('Create method should return a New User', async () => {
			const createdUser = await userModel.create({
				username: 'mahmoud_metmwah',
				firstname: 'Mahmoud',
				lastname: 'Metmwah',
				password: 'password456',
				email: 'mahmoud@gmail.com',
			});
			expect(createdUser).toEqual({
				id: createdUser.id,
				email: 'mahmoud@gmail.com',
				username: 'mahmoud_metmwah',
				firstname: 'Mahmoud',
				lastname: 'Metmwah',
			} as User);
		});

		it('Get Many method should return All available users in DB', async () => {
			const users = await userModel.list();
			expect(users.length).toBe(2);
		});

		it('Get One method should return testUser when called with ID', async () => {
			const returnedUser = await userModel.getUser(user.id as unknown as string);
			expect(returnedUser.id).toBe(user.id);
			expect(returnedUser.email).toBe(user.email);
			expect(returnedUser.username).toBe(user.username);
			expect(returnedUser.firstname).toBe(user.firstname);
			expect(returnedUser.lastname).toBe(user.lastname);
		});

		it('Update One method should return a user with edited attributes', async () => {
			const updatedUser = await userModel.updateUser(user.id as unknown as string, {
				username: 'maro_meto',
				firstname: 'Maro',
				lastname: 'Meto',
                password: 'password456',
                email: 'omar@gmail.com',
			});
			expect(updatedUser.id).toBe(user.id);
			expect(updatedUser.email).toBe(user.email);
			expect(updatedUser.username).toBe('maro_meto');
			expect(updatedUser.firstname).toBe('Maro');
			expect(updatedUser.lastname).toBe('Meto');
		});

		it('Delete One method should delete user from DB', async () => {
			const deletedUser = await userModel.deleteUser(user.id as unknown as string);
			expect(deletedUser.id).toBe(user.id);
		});
	});
});
