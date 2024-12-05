import httpStatus from 'http-status';
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";



const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is created successfully',
        data: result
    })
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty is retrieved successfully",
        data: result
    })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty is retrieved successfully",
        data: result
    })
})
const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params
    const result = await AcademicFacultyServices.updatedAcademicFacultyIntoDB(facultyId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty is retrieved successfully",
        data: result
    })
})



export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}