/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ErrorRequestHandler, } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";



const globalErrorHandle: ErrorRequestHandler = ((error, req, res, next) => {


    // eslint-disable-next-line prefer-const
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Something went wrong'


    let errorSource: TErrorSource = [
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
       statusCode=simplifiedError?.statusCode;
       message = simplifiedError?.message;
       errorSource = simplifiedError?.errorSource;


    }



    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
       
    })
})

export default globalErrorHandle


