import express from "express";
import { AuthController } from "../controllers";

const authRouter = express.Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post("/signin", AuthController.signin);
authRouter.post("/google", AuthController.oauthGoogle);

export default authRouter;
