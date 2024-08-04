import {Request, Response} from 'express'
import {IUser} from "../types/types";
import UserService from "./user.service";
import {verify} from "jsonwebtoken";
import {DECODE_KEY} from "../accesses";
import {getAuthentication} from "../utils/authentication";

class UserController {
    async registration(req: Request, res: Response) {
        try {
            const {name, password} = req.body as IUser
            const access = await UserService.registration({name, password})
            res.status(200).send(access)
        } catch (error: any) {
            console.log({ [error.name]: error?.message })
            res.status(400).json({ [error.name]: error?.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {name, password} = req.body as IUser
            const access = await UserService.login({name, password})
            res.status(200).send(access)
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async getMe(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1] as string
            const {_id} = verify(token, DECODE_KEY) as VerifyData
            const result = await UserService.getMe(_id)
            res.status(200).json({
                name: result.name,
                id: result._id
            })
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
    async refreshToken(req: Request, res: Response) {
        try {
            const token = req.body.token
            const access = verify(token, DECODE_KEY) as VerifyData
            const newPairTokens = getAuthentication(access)
            res.status(200).send(newPairTokens)
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}

export default new UserController()
