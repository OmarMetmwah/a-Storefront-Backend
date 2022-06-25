import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';

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
		const user = (await userModel.getUser(req.params.id)) || `There is no user with id: ${req.params.id}`;
		res.json({ status: 'success', data: user });
	} catch (err) {
		next(err);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = (await userModel.updateUser(req.params.id, req.body)) || `There is no user with id: ${req.params.id}`;
		res.json({ status: 'success', data: user });
	} catch (err) {
		next(err);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = (await userModel.deleteUser(req.params.id)) || `There is no user with id: ${req.params.id}`;
		res.json({ status: 'success', data: user });
	} catch (err) {
		next(err);
	}
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userModel.authenticate(req.body.username, req.body.password);
		const token = jwt.sign({ user }, config.tokenSecret as string);
		if (!user) {
			return res.status(401).json({
				status: 'error',
				message: 'the username and password don not match',
			});
		}
		res.json({ status: 'success', data: { ...user, token } });
	} catch (err) {
		next(err);
	}
};
