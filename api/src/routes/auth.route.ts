import express from "express";
import { AuthController } from "../controllers";

const authRouter = express.Router();

authRouter.post("/signup", AuthController.signup);

export default authRouter;
