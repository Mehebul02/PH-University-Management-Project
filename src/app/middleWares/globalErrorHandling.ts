/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ErrorRequestHandler, } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";



const globalErrorHandle: ErrorRequestHandler = ((error, req, res, next) => {


    // eslint-disable-next-line prefer-const
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Something went wrong'


    let errorSource: TErrorSources = [
        {
            path: '',
            message: 'Something wend wrong'
        }
    ]



    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSources;
    } else if (error === 'validationError') {
        const simplifiedError = handleValidationError(error)
        statusCode = simplifiedError.statusCode,
            message = simplifiedError.message,
            errorSource = simplifiedError.errorSources
    }


    // Ultimate return 
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config.NODE_ENV === 'development' ? error?.stack : null

    })
})

export default globalErrorHandle


