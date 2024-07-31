import { Request, Response } from "express";

export default class UserController {
	static async findUser(req: Request, res: Response) {
		return res.json({ message: "Finding user..." });
	}
}
