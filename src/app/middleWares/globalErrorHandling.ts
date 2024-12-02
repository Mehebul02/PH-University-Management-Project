/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { NextFunction, Request, Response } from "express";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandle = ((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 400;
    const message = error.message || 'Something went wrong'
    return res.status(statusCode).json({
        success: false,
        message,
        error: error
    })
})

export default globalErrorHandle