import User from '../../types/user.types';
import UserModel from '../../models/user.model';

const userModel = new UserModel();

describe('User Model', () => {
	const user: User = {
		username: 'omar_metmwah',
		firstname: 'Omar',
		lastname: 'Metmwah',
		password: 'password123',
		email: 'omar@gmail.com',
	};

	it('should have an index method', () => {
		expect(userModel.list).toBeDefined();
	});

	it('should have a show method', () => {
		expect(userModel.getUser).toBeDefined();
	});

	it('should have a create method', () => {
		expect(userModel.create).toBeDefined();
	});

	it('should have a remove method', () => {
		expect(userModel.deleteUser).toBeDefined();
	});

	it('create method should create a user', async () => {
		const createdUser: User = await userModel.create(user);

		if (createdUser) {
			const { username, firstname, lastname } = createdUser;

			expect(username).toBe(user.username);
			expect(firstname).toBe(user.firstname);
			expect(lastname).toBe(user.lastname);
		}

		await userModel.deleteUser(createdUser.id as unknown as string);
	});

	it('index method should return a list of users', async () => {
		const createdUser: User = await userModel.create(user);
		const userList = await userModel.list();

		expect(userList).toEqual([createdUser]);

		await userModel.deleteUser(createdUser.id as unknown as string);
	});

	it('show method should return the correct users', async () => {
		const createdUser: User = await userModel.create(user);
		const userFromDb = await userModel.getUser(createdUser.id as unknown as string);

		expect(userFromDb).toEqual(createdUser);

		await userModel.deleteUser(createdUser.id as unknown as string);
	});

	it('remove method should remove the user', async () => {
		const createdUser: User = await userModel.create(user);

		await userModel.deleteUser(createdUser.id as unknown as string);

		const userList = await userModel.list();

		expect(userList).toEqual([]);
	});

	it('update method should update the user', async () => {
		const createdUser: User = await userModel.create(user);
		const newUserData = {
			firstname: 'Omar',
			lastname: 'Metmwah',
			username: 'omar_metmwah512',
			password: '012012012',
			email: 'omar@gmail.com',
		};

		const { firstname, lastname } = await userModel.updateUser(createdUser.id as unknown as string, newUserData as User);

		expect(firstname).toEqual(newUserData.firstname);
		expect(lastname).toEqual(newUserData.lastname);

		await userModel.deleteUser(createdUser.id as unknown as string);
	});

	it('authenticates the user with a password', async () => {
		const createdUser: User = await userModel.create(user);

		const userFromDB = await userModel.authenticate(user.username, user.password);

		if (userFromDB) {
			const { username, firstname, lastname } = userFromDB;

			expect(username).toBe(user.username);
			expect(firstname).toBe(user.firstname);
			expect(lastname).toBe(user.lastname);
		}

		await userModel.deleteUser(createdUser.id as unknown as string);
	});
});
