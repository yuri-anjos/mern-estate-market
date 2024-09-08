import { NextFunction, Response } from "express";
import errorHandler from "../utils/error";
import bcryptjs from "bcryptjs";
import { SALT_ROUNDS } from "./auth.controller";
import { User } from "../models";
import UpdateUserDTO from "../dtos/update-user.dto";

export default class UserController {
	static async updateUser(req: any, res: Response, next: NextFunction) {
		const { id } = req.params;
		if (req.userId !== id) {
			return next(errorHandler(401, "Access denied!"));
		}

		const { username, email, password, confirmPassword, avatar }: UpdateUserDTO = req.body;
		const data: UpdateUserDTO = { username, email, avatar };

		try {
			if (password && confirmPassword) {
				if (password !== confirmPassword) {
					return next(errorHandler(400, "Both passwords should be the same!"));
				}
				data.password = bcryptjs.hashSync(password, SALT_ROUNDS);
			}

			const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
			return res.status(200).json(updatedUser);
		} catch (error) {
			return next(error);
		}
	}
}
