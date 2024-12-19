import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { CourseServices } from "./course.servise";


const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is created successfully",
        data: result
    })
})

const getAllCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourseFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course are retrieved successfully",
        data: result
    })
})
const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await CourseServices.getSingleCourseFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course are retrieved successfully",
        data: result
    })
})

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params

    const result = await CourseServices.updateCourseIntoDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course are updated successfully",
        data: result
    })
})

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await CourseServices.deleteCourseFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course are deleted successfully",
        data: result
    })
})



export const CourseController = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse
}