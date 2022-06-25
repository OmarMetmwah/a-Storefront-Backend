import Product from '../types/product.type';
import db from '../database';

class ProductModel {
	//create
	async create(product: Product): Promise<Product> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = `INSERT INTO products(name, price)
            VALUES($1,$2) RETURNING id, name, price`;
			//run query
			const result = await conncection.query(query, [product.name, product.price]);
			//release conncetion
			conncection.release();
			//return
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Create Product: ${product.name} because ${(err as Error).message}`);
		}
	}
	//list
	async list(): Promise<Product[]> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = 'SELECT id, name, price FROM products';
			//run query
			const result = await conncection.query(query);
			//release conncetion
			conncection.release();
			//return
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot Return Products because ${(err as Error).message}`);
		}
	}
	//get specific
	async getProduct(id: string): Promise<Product> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = 'SELECT id, name, price FROM products WHERE id=($1)';
			//run query
			const result = await conncection.query(query, [id]);
			//release conncetion
			conncection.release();
			//return
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Find Product ${id} because ${(err as Error).message}`);
		}
	}
	//update
	async updateProduct(id: string, product: Product): Promise<Product> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = `UPDATE products SET name=$1, price=$2 WHERE id=$3
            RETURNING id, name, price`;
			//run query
			const result = await conncection.query(query, [product.name, product.price, id]);
			//release conncetion
			conncection.release();
			//return
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Update Product ${id} because ${(err as Error).message}`);
		}
	}
	//delete
	async deleteProduct(id: string): Promise<Product> {
		try {
			//open conncection
			const conncection = await db.connect();
			const query = 'DELETE FROM products WHERE id=($1) RETURNING id, name, price;';
			//run query
			const result = await conncection.query(query, [id]);
			//release conncetion
			conncection.release();
			//return
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Delete User ${id} because ${(err as Error).message}`);
		}
	}
}
export default ProductModel;
