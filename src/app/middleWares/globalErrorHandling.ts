/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";



const globalErrorHandle: ErrorRequestHandler = ((error, req, res, next) => {


    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong'

    type TErrorSource = {
        path: string | number
        message:string
    }[]
    res.status(statusCode).json({
        success: false,
        message,
        error: error
    })
})

export default globalErrorHandle


