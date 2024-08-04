import { Router } from "express";
import userController from "./user.controller";
import {validate} from "../utils/validate";
import {authSchema, refreshSchema} from "./user.schema";
import {checkAuthentication} from "../utils/authentication";

const PATH = '/auth'

const userRouter = Router()

userRouter.post(PATH + '/registration', validate(authSchema) , userController.registration)
userRouter.post(PATH + '/login', validate(authSchema), userController.login)
userRouter.get(PATH + '/me', checkAuthentication, userController.getMe)
userRouter.post(PATH + '/refresh', validate(refreshSchema), userController.refreshToken)

export default userRouter
