/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ErrorRequestHandler, } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";



const globalErrorHandle: ErrorRequestHandler = ((error, req, res, next) => {


    // eslint-disable-next-line prefer-const
    let statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong'


    const errorSource: TErrorSource = [
        {
            path: '',
            message: 'Something wend wrong'
        }
    ]

    const handleError = (error: ZodError) => {

        const errorSources: TErrorSource = error.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue.message
            }
        })

        const statusCode = 400;
        return {
            statusCode,
            message: "Zod Validation error",
            errorSource
        }
    }

    if (error instanceof ZodError) {
        const simplifiedError = handleError(error);
        message: 'Zod Error';

    }



    res.status(statusCode).json({
        success: false,
        errorSource,
        message,
        AmrError: error
    })
})

export default globalErrorHandle


