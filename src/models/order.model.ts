import { Order, OrderProduct } from '../types/order.type';
import db from '../database';

class OrderModel {
	//create
	async create(order: Order): Promise<Order> {
		try {
			//open conncection
			const connection = await db.connect();
			const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';

			//run query
			const result = await connection.query(sql, [order.user_id, order.status]);

			const orderProductsSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
			const orderProducts: OrderProduct[] = [];

			for (const product of order.products) {
				const { rows } = await connection.query(orderProductsSql, [result.rows[0].id, product.product_id, product.quantity]);
				orderProducts.push(rows[0]);
			}
			//release conncetion
			connection.release();

			return {
				...order,
				products: orderProducts,
			};
		} catch (err) {
			throw new Error(`Cannot add new order for user ${order.user_id} because ${(err as Error).message}`);
		}
	}

	//list
	async list(): Promise<Order[]> {
		try {
			//open conncection
			const connection = await db.connect();
			const sql = 'SELECT * FROM orders';

			const results = await connection.query(sql);

			const orderProductsSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
			const orders = [];

			for (const order of results.rows) {
				const { rows: orderProductRows } = await connection.query(orderProductsSql, [order.id]);
				orders.push({
					...order,
					products: orderProductRows,
				});
			}

			//release connection
			connection.release();

			return orders;
		} catch (err) {
			throw new Error(`Cannot get orders ${err} because ${(err as Error).message}`);
		}
	}

	//get specific
	async getOrder(id: string): Promise<Order> {
		try {
			//open connection
			const connection = await db.connect();

			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const results = await connection.query(sql, [id]);
			const order = results.rows[0];

			const orderProductsSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
			const { rows: orderProductRows } = await connection.query(orderProductsSql, [id]);

			connection.release();

			return {
				...order,
				products: orderProductRows,
			};
		} catch (err) {
			throw new Error(`Cannot find order ${id} because ${(err as Error).message}`);
		}
	}

	//update
	async updateOrder(id: string, order: Order): Promise<Order> {
		try {
			//open connection
			const connection = await db.connect();
			const sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';

			const result = await connection.query(sql, [order.status, id]);

			const orderProductsSql = 'UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity';
			const orderProducts: OrderProduct[] = [];

			for (const product of order.products) {
				const { product_id, quantity } = product;

				const { rows } = await connection.query(orderProductsSql, [product_id, quantity, result.rows[0].id]);
				orderProducts.push(rows[0]);
			}

			connection.release();

			return {
				...result.rows[0],
				products: orderProducts,
			};
		} catch (err) {
			throw new Error(`Cannot update order for user ${order.user_id} because ${(err as Error).message}`);
		}
	}

	//delete
	async deleteOrder(id: string): Promise<Order> {
		try {
			const connection = await db.connect();
			const orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
			await connection.query(orderProductsSql, [id]);

			const sql = 'DELETE FROM orders WHERE id=($1)';
			const result = await connection.query(sql, [id]);

			connection.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot delete order ${id} because ${(err as Error).message}`);
		}
	}
}
export default OrderModel;
