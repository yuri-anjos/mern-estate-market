import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI as string)
	.then(() => {
		console.log("Connected to MongoDB!");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

const port = 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`Server is running on port ${process.env.PORT}!`);
});
