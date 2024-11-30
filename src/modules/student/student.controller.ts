

import { NextFunction } from 'express';
import { StudentServices } from './student.service'


const getSingleStudent = async (
    req: Request,
    res: Response,
    next:NextFunction

) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.getSingleStudentFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

const getAllStudents = async (
    req: Request,
    res: Response,next:NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()

        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    } catch (error) {
       next(error)
    }
}

// const deleteStudent = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const { studentId } = req.params
//         const result = await StudentServices.deleteStudentFromDB(studentId)

//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: 'Student is deleted succesfully',
//             data: result,
//         })
//     } catch (err) {
//         next(err)
//     }
// }

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
   
}
