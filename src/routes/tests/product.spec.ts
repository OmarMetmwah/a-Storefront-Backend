import supertest from 'supertest';
import db from '../../database';
import app from '../../index';
import Product from '../../types/product.type';
import User from '../../types/user.types';
import UserModel from '../../models/user.model';

const request = supertest(app);
const userModel = new UserModel();

describe('Product Handler', () => {
	let productId: number;

	const product: Product = {
		name: 'Oreo',
		price: 5,
	};
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

	it('gets the create endpoint', done => {
		request
			.post('/api/products')
			.send(product)
			.then(res => {
				const { body, status } = res;

				expect(status).toBe(200);
				productId = body.data.id;
				done();
			});
	});

	it('gets the index endpoint', done => {
		request.get('/api/products').then(res => {
			expect(res.status).toBe(200);
			done();
		});
	});

	it('gets the read endpoint', done => {
		request.get(`/api/products/${productId}`).then(res => {
			expect(res.status).toBe(200);
			done();
		});
	});

	it('gets the update endpoint', done => {
		const newProductData: Product = {
			...product,
			name: 'CodeMerge 156 A',
			price: 1299,
		};

		request
			.patch(`/api/products/${productId}`)
			.send(newProductData)
			.then(res => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the delete endpoint', done => {
		request.delete(`/api/products/${productId}`).then(res => {
			expect(res.status).toBe(200);
			done();
		});
	});
});
