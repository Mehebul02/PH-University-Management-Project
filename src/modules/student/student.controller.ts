import httpStatus from 'http-status';
import { StudentServices } from './student.service'
import sendResponse from '../../app/utils/sendResponse';
import catchAsync from '../../app/utils/catchAsync';



const getSingleStudent = catchAsync(async (req, res,) => {

    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)

    sendResponse(res, {
        statusCode: httpStatus.Ok,
        success: true,
        message: 'Student is retrieved successfully',
        data: result

    })
})

const getAllStudents = catchAsync(async (req, res,) => {
    const result = await StudentServices.getAllStudentsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.Ok,
        success: true,
        message: 'Student is retrieved successfully',
        data: result

    })
}
)

const deleteStudent = catchAsync(async (req, res,) => {
        const { studentId } = req.params
        const result = await StudentServices.deleteStudentFromDB(studentId)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is deleted succesfully',
            data: result,
        })

    }
)

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,

}
