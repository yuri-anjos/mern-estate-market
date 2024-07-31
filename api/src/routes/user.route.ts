import express from "express";
import { UserController } from "../controllers";

const userRouter = express.Router();

userRouter.get("/", UserController.findUser);

export default userRouter;
