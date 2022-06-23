import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userModel.create(req.body);
		res.json({ status: 'success', data: user });
	} catch (err) {
		next(err);
	}
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userModel.list();
		res.json({ status: 'success', data: users });
	} catch (err) {
		next(err);
	}
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userModel.getUser(req.params.id);
		res.json({ status: 'success', data: user });
	} catch (err) {
		next(err);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userModel.updateUser(req.body);
		res.json({ status: 'success', data: user });
	} catch (err) {
		next(err);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userModel.deleteUser(req.params.id);
		res.json({ status: 'success', data: user });
	} catch (err) {
		next(err);
	}
};
