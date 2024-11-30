import { NextFunction, Request, Response } from "express";


const notFound = (req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    message: err.message || 'something wend wrong';
    return res.status(statusCode).json({

    })
}