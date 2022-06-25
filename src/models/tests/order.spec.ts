import { Order } from '../../types/order.type';
import OrderModel from '../../models/order.model';
import Product from '../../types/product.type';
import ProductModel from '../../models/product.model';
import User from '../../types/user.types';
import UserModel from '../../models/user.model';

const orderModel = new OrderModel();

describe('Order Model', () => {
	const userModel = new UserModel();
	const productModel = new ProductModel();

	let order: Order, user_id: number, product_id: number;

	beforeAll(async () => {
		const user: User = await userModel.create({
			username: 'omar_metmwah',
			firstname: 'Omar',
			lastname: 'Metmwah',
			password: 'password123',
			email: 'omar@gmail.com',
		});

		user_id = user.id as number;

		const product: Product = await productModel.create({
			name: 'Oreo',
			price: 5,
		});

		product_id = product.id as number;

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
		await userModel.deleteUser(user_id as unknown as string);
		await productModel.deleteProduct(product_id as unknown as string);
	});

	it('should have an index method', () => {
		expect(orderModel.list).toBeDefined();
	});

	it('should have a show method', () => {
		expect(orderModel.getOrder).toBeDefined();
	});

	it('should have a add method', () => {
		expect(orderModel.create).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(orderModel.deleteOrder).toBeDefined();
	});

	it('add method should add a order', async () => {
		const createdOrder: Order = await orderModel.create(order);

		expect(createdOrder).toEqual({
			id: createdOrder.id,
			...order,
		});

		await orderModel.deleteOrder(createdOrder.id as unknown as string);
	});

	it('index method should return a list of orders', async () => {
		const createdOrder: Order = await orderModel.create(order);
		const orderList = await orderModel.list();

		expect(orderList).toEqual([createdOrder]);

		await orderModel.deleteOrder(createdOrder.id as unknown as string);
	});

	it('show method should return the correct orders', async () => {
		const createdOrder: Order = await orderModel.create(order);
		const orderFromDb = await orderModel.getOrder(createdOrder.id as unknown as string);

		expect(orderFromDb).toEqual(createdOrder);

		await orderModel.deleteOrder(createdOrder.id as unknown as string);
	});

	it('update method should update the order', async () => {
		const createdOrder: Order = await orderModel.create(order);
		const newOrderData: Order = {
			products: [
				{
					product_id,
					quantity: 200,
				},
			],
			user_id,
			status: false,
		};

		const { products, status } = await orderModel.updateOrder(createdOrder.id as unknown as string, newOrderData);

		expect(products).toEqual(newOrderData.products);
		expect(status).toEqual(newOrderData.status);

		await orderModel.deleteOrder(createdOrder.id as unknown as string);
	});

	it('delete method should remove the order', async () => {
		const createdOrder: Order = await orderModel.create(order);

		await orderModel.deleteOrder(createdOrder.id as unknown as string);

		const orderList = await orderModel.list();

		expect(orderList).toEqual([]);
	});
});
