/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
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