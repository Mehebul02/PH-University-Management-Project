import httpStatus from 'http-status';
import express, { Request, NextFunction, RequestHandler, Response, } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../app/utils/sendResponse'


const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
}

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
    try {
        const { password, student: studentData } = req.body
        // const zodParsedData = userValidation.parse(studentData)
        const result = await UserServices.createStudentIntoDB(password, studentData)
        newFunction(res, result);
    } catch (error) {
        next(error)
    }
})




export const userControllers = {
    createStudent
}

function newFunction(res: express.Response<any, Record<string, any>>, result: (import("mongoose").Document<unknown, {}, import("e:/Next Level/Backend-project/PH University Management Project/src/modules/student/student.interface").TStudent> & import("e:/Next Level/Backend-project/PH University Management Project/src/modules/student/student.interface").TStudent & { _id: import("mongoose").Types.ObjectId; } & { __v: number; }) | undefined) {
    sendResponse(res, {
        statusCode: httpStatus.Ok,
        success: true,
        message: 'Student Created successfully',
        data: result
    });
}
