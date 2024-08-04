import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, sign, verify} from 'jsonwebtoken'
import {DECODE_KEY} from "../accesses";
import {IAuthentication, VerifyData} from "../types/types";

export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        res.status(403).json('Не авторизован')
        return
    }
    try {
        req.userData = verify(token, DECODE_KEY) as VerifyData
        console.log(verify(token, DECODE_KEY), 'verify')
        next()
    } catch (err: any) {
        if (err instanceof JsonWebTokenError) {
            res.status(403).json(err.message);
            return
        }
        res.status(500);
    }
};

export const checkRefresh = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    console.log(123, 'test')
    const token = req.body.token
    try {
        req.userData = verify(token, DECODE_KEY) as VerifyData
        next()
    } catch (err: any) {
        if (err instanceof JsonWebTokenError) {
            res.status(403).json(err.message);
            return
        }
        res.status(500);
    }
};

export const getAuthentication = (data: VerifyData): IAuthentication => {
     return {
         access: sign(data, DECODE_KEY, { expiresIn: '1m' }),
         refresh: sign(data, DECODE_KEY, { expiresIn: '1h' }),
     }
}
