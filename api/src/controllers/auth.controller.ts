import { NextFunction, Request, Response } from "express";
import SignupDTO from "../dtos/signup.dto";
import { User } from "../models";
import bcryptjs from "bcryptjs";
import LoginDTO from "../dtos/login.dto";
import errorHandler from "../utils/error";
import { createUserToken, getTokenExpirationDate } from "../utils/token.helper";

const SALT_ROUNDS = 10;

export default class AuthController {
	static async signup(req: Request<{}, {}, SignupDTO>, res: Response, next: NextFunction) {
		const { username, email, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return next(errorHandler(400, "Passwords do not match!"));
		}

		try {
			const hashedPassword = bcryptjs.hashSync(password, SALT_ROUNDS);
			const newUser = await User.create({ username, email, password: hashedPassword });
			const token = createUserToken(newUser._id);

			return res
				.cookie("access_token", token, {
					httpOnly: true,
					expires: getTokenExpirationDate(),
				})
				.status(201)
				.json(newUser);
		} catch (error: any) {
			return next(error);
		}
	}

	static async signin(req: Request<{}, {}, LoginDTO>, res: Response, next: NextFunction) {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });
			if (!user) {
				return next(errorHandler(404, "User not found!"));
			}

			const validPassword = bcryptjs.compareSync(password, user.password as string);
			if (!validPassword) {
				return next(errorHandler(401, "Invalid credentials!"));
			}

			const token = createUserToken(user._id);
			return res
				.cookie("access_token", token, {
					httpOnly: true,
					expires: getTokenExpirationDate(),
				})
				.status(200)
				.json(user);
		} catch (error: any) {
			return next(error);
		}
	}
}
