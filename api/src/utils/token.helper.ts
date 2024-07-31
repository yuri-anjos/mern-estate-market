import jwt from "jsonwebtoken";
import mongoose from "mongoose";

function createUserToken(_id: mongoose.Types.ObjectId): string {
	const token = jwt.sign({ id: _id }, process.env.JWT_KEY as string);
	return token;
}

function getTokenExpirationDate(): Date {
	return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

// function getToken(req: Request): string | undefined {
// 	const authHeader = req.headers.authorization;
// 	const token = authHeader?.split(" ")[1];
// 	return token;
// }

// function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
// 	const token = getToken(req);

// 	try {
// 		if (token) {
// 			const verified = jwt.verify(token, process.env.JWT_KEY as string);
// 			// req.userId = verified.id;
// 			next();
// 		}
// 	} catch (error) {
// 		return res.status(401).json({ message: "Access denied" });
// 	}
// }

export { createUserToken, getTokenExpirationDate };
