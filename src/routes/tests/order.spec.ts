import supertest from 'supertest';
import app from '../../index';
import { Order } from '../../types/order.type';
import User from '../../types/user.types';
import UserModel from '../../models/user.model';
import Product from '../../types/product.type';
import ProductModel from '../../models/product.model';
import db from '../../database';

const request = supertest(app);
const userModel = new UserModel();
const productModel = new ProductModel();

describe('Order Handler', () => {
	let token: string, order: Order, user_id: number, product_id: number, order_id: number;

	beforeAll(async () => {
		const user: User = {
			username: 'omar_metmwah',
			firstname: 'Omar',
			lastname: 'Metmwah',
			password: 'password123',
			email: 'omar@gmail.com',
		};
		const product: Product = {
			name: 'Oreo',
			price: 5,
		};

		const createdUser = await userModel.create(user);
        user_id = createdUser.id as number;

		const createdProduct = await productModel.create(product);
		product_id = createdProduct.id as number;

		order = {
			products: [
				{
					product_id,
					quantity: 5,
				},
			],
			user_id,
			status: true,
		};
	});

	afterAll(async () => {
		const connection = await db.connect();
		const sql = 'DELETE FROM order_products; DELETE FROM products; DELETE FROM orders; DELETE FROM users;';
		await connection.query(sql);
		connection.release();
	});

	it('gets the create endpoint', done => {
		request
			.post('/api/orders')
			.send(order)
			.then(res => {
				const { body, status } = res;

				expect(status).toBe(200);

				order_id = body.data.id;

				done();
			});
	});

	it('gets the index endpoint', done => {
		request.get('/api/orders').then(res => {
			expect(res.status).toBe(200);
			done();
		});
	});

	it('gets the read endpoint', done => {
		request.get(`/api/orders/${order_id}`).then(res => {
			expect(res.status).toBe(200);
			done();
		});
	});

	it('gets the update endpoint', done => {
		const newOrder: Order = {
			...order,
			status: false,
		};

		request
			.patch(`/api/orders/${order_id}`)
			.send(newOrder)
			.then(res => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the delete endpoint', done => {
		request.delete(`/api/orders/${order_id}`).then(res => {
			expect(res.status).toBe(200);
			done();
		});
	});
});
