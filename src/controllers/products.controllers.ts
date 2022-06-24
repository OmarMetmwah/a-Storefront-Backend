import { Request, Response, NextFunction } from 'express';
import ProductModel from '../models/product.model';

const productModel = new ProductModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await productModel.create(req.body);
		res.json({ status: 'success', data: product });
	} catch (err) {
		next(err);
	}
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await productModel.list();
		res.json({ status: 'success', data: products });
	} catch (err) {
		next(err);
	}
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await productModel.getProduct(req.params.id);
		res.json({ status: 'success', data: product });
	} catch (err) {
		next(err);
	}
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await productModel.updateProduct(req.body);
		res.json({ status: 'success', data: product });
	} catch (err) {
		next(err);
	}
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await productModel.deleteProduct(req.params.id);
		res.json({ status: 'success', data: product });
	} catch (err) {
		next(err);
	}
};
