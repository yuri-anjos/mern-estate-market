import express from "express";
import { UserController } from "../controllers";
import { verifyTokenMiddleware } from "../utils/token.helper";

const userRouter = express.Router();

userRouter.put("/:id", verifyTokenMiddleware, UserController.updateUser);

export default userRouter;
