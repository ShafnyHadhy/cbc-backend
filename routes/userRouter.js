import expess from 'express'
import { createUser, loginUser } from '../controllers/userController.js';

const userRouter = expess.Router();

userRouter.post("/", createUser)
userRouter.post("/login", loginUser)

export default userRouter

