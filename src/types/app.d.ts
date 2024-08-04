import * as express from 'express';

declare global {
    export interface VerifyData {
        _id: string;
        name: string;
    }
    
    namespace Express {
        export interface Request {
            userData?: VerifyData;
        }
    }
}

export {};
