

import { StudentServices } from './student.service'


const getSingleStudent = async (
    req: Request,
    res: Response,

) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.getSingleStudentFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Student is retrieved succesfully'

        })
    }
}

const getAllStudents = async (
    req: Request,
    res: Response,) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()

        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
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
