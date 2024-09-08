import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter, authRouter } from "./routes";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI as string)
	.then(() => {
		console.log("Connected to MongoDB!");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
	res.send("Express + TypeScript Server");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}!`);
});
