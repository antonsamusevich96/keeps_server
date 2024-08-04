import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError, AnyObject } from 'yup';

type ValidateMiddleware = <T extends AnyObject>(
    schema: ObjectSchema<T>
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const validate: ValidateMiddleware = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, {
            abortEarly: false
        });
        next();
    } catch (err) {
        if (err instanceof ValidationError) {
            const errors = err.inner.reduce((acc: { [key: string]: string }, error) => {
                if (error.path) {
                    acc[error.path] = acc[error.path]
                        ? `${acc[error.path]}, ${error.message.toLowerCase()}`
                        : error.message;
                }
                return acc;
            }, {});
            res.status(422).json({ errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
