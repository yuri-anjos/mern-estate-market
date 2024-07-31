import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter, authRouter } from "./routes";

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

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`Server is running on port ${process.env.PORT}!`);
});
