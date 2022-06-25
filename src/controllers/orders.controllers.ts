import { Request, Response, NextFunction } from 'express';
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = await orderModel.create(req.body);
		res.json({ status: 'success', data: order });
	} catch (err) {
		next(err);
	}
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const orders = await orderModel.list();
		res.json({ status: 'success', data: orders });
	} catch (err) {
		next(err);
	}
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = await orderModel.getOrder(req.params.id);
		res.json({ status: 'success', data: order });
	} catch (err) {
		next(err);
	}
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = await orderModel.updateOrder(req.params.id, req.body);
		res.json({ status: 'success', data: order });
	} catch (err) {
		next(err);
	}
};

export const deleteorder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = (await orderModel.deleteOrder(req.params.id)) || `There is no order with id: ${req.params.id}`;
		res.json({ status: 'success', data: order });
	} catch (err) {
		next(err);
	}
};
