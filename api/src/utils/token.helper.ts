import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import errorHandler from "./error";

function createUserToken(_id: mongoose.Types.ObjectId): string {
	const token = jwt.sign({ id: _id }, process.env.JWT_KEY as string);
	return token;
}

function getTokenExpirationDate(): Date {
	return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

function getToken(req: any): string | undefined {
	const token = req.cookies.access_token;
	return token;
}

function verifyTokenMiddleware(req: any, res: any, next: NextFunction) {
	try {
		const token = getToken(req);
		const verified: any = jwt.verify(token!, process.env.JWT_KEY as string);
		console.log(verified);
		req.userId = verified.id;
		next();
	} catch (error) {
		return next(errorHandler(401, "Access denied!"));
	}
}

export { createUserToken, getTokenExpirationDate, verifyTokenMiddleware };
