/* eslint-disable @typescript-eslint/no-unused-vars */
import  httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { error } from 'console';



const notFound = (req: Request, res: Response, next: NextFunction) => {

    return res.status(httpStatus.Not_Found).json({
        success: false,
        message: 'API Not found',
        error: ""

    })
}

export default notFound