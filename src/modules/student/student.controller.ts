import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { StudentServices } from './student.service'
import sendResponse from '../../app/utils/sendResponse';


const getSingleStudent = async (
    req: Request,
    res: Response,
    next: NextFunction

) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.getSingleStudentFromDB(studentId)

        sendResponse(res, {
            statusCode: httpStatus.Ok,
            success: true,
            message: 'Student is retrieved successfully',
            data: result

        })
    } catch (error) {
        next(error)
    }
}

const getAllStudents = async (
    req: Request,
    res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()
        sendResponse(res, {
            statusCode: httpStatus.Ok,
            success: true,
            message: 'Student is retrieved successfully',
            data: result

        })


    } catch (error) {
        next(error)
    }
}

const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.deleteStudentFromDB(studentId)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is deleted succesfully',
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,

}
