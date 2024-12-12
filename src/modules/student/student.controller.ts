import httpStatus from 'http-status';
import { StudentServices } from './student.service'
import sendResponse from '../../app/utils/sendResponse';
import catchAsync from '../../app/utils/catchAsync';



const getSingleStudent = catchAsync(async (req, res,) => {

    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId,)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student are retrieved succesfully',
        data: result,

    })
})

const getAllStudents = catchAsync(async (req, res,) => {
    console.log(req.query);
    const result = await StudentServices.getAllStudentsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student are retrieved succesfully',
        data: result,

    })
}
)

const updateStudent = catchAsync(async (req, res,) => {
    const { studentId } = req.params
    const { student } = req.body
    const result = await StudentServices.updateStudentFromDB(studentId, student)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student are retrieved succesfully',
        data: result,
    })

}
)
const deleteStudent = catchAsync(async (req, res,) => {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is deleted successfully',
        data: result,
    })

}
)

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,

}
