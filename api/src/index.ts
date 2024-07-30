import { Request, Response } from "express";

const express = require("express");

const port = 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}!`);
});
