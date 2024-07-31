import { Request, Response } from "express";
import CreateUserDTO from "../dtos/create-user.dto";
import { User } from "../models";
import bcryptjs from "bcryptjs";

const SALT_ROUNDS = 10;

export default class AuthController {
	static async signup(req: Request<{}, {}, CreateUserDTO>, res: Response) {
		const { username, email, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match!" });
		}

		try {
			// Hash Password
			const hashedPassword = bcryptjs.hashSync(password, SALT_ROUNDS);

			const newUser = await User.create({ username, email, password: hashedPassword });
			return res.status(201).json(newUser);
		} catch (error: any) {
			return res.status(500).json({ message: "Error creating user", error: error.message });
		}
	}
}
