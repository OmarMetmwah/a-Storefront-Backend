import Product from '../../types/product.type';
import ProductModel from '../product.model';

const productModel = new ProductModel();

describe('Product Model', () => {
	const product: Product = {
		name: 'Oreo',
		price: 5,
	};

	it('should have an index method', () => {
		expect(productModel.list).toBeDefined();
	});

	it('should have a show method', () => {
		expect(productModel.getProduct).toBeDefined();
	});

	it('should have a add method', () => {
		expect(productModel.create).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(productModel.deleteProduct).toBeDefined();
	});

	it('add method should add a product', async () => {
		const createdProduct: Product = await productModel.create(product);

		expect(createdProduct).toEqual({
			id: createdProduct.id,
			...product,
		});

		await productModel.deleteProduct(createdProduct.id as unknown as string);
	});

	it('index method should return a list of products', async () => {
		const createdProduct: Product = await productModel.create(product);
		const productList = await productModel.list();

		expect(productList).toEqual([createdProduct]);

		await productModel.deleteProduct(createdProduct.id as unknown as string);
	});

	it('show method should return the correct product', async () => {
		const createdProduct: Product = await productModel.create(product);
		const productFromDb = await productModel.getProduct(createdProduct.id as unknown as string);

		expect(productFromDb).toEqual(createdProduct);

		await productModel.deleteProduct(createdProduct.id as unknown as string);
	});

	it('update method should update the product', async () => {
		const createdProduct: Product = await productModel.create(product);
		const newProductData: Product = {
			name: 'Cookies',
			price: 3,
		};

		const { name, price } = await productModel.updateProduct(createdProduct.id as unknown as string, newProductData);

		expect(name).toEqual(newProductData.name);
		expect(price).toEqual(newProductData.price);

		await productModel.deleteProduct(createdProduct.id as unknown as string);
	});

	it('delete method should remove the product', async () => {
		const createdProduct: Product = await productModel.create(product);

		await productModel.deleteProduct(createdProduct.id as unknown as string);

		const productList = await productModel.list();

		expect(productList).toEqual([]);
	});
});
