/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";


const globalErrorHandle = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = error.message || 'Something went wrong'
    return res.status(statusCode).json({
        success: false,
        message,
        error: error
    })
}

export default globalErrorHandle