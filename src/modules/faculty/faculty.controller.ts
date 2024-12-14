import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { FacultyServices } from "./faculty.service";




const getSingleFaculty = catchAsync(async(req, res) => {
    const { id } = req.params
    const result = await FacultyServices.getSingleFacultyFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculties are retrieved successfully",
        data: result
    })
})

const getAllFaculties = catchAsync(async (req, res) => {
    const result = await FacultyServices.getAllFacultiesFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculties are retrieved successfully",
        data: result
    })

})




export const FacultiesControllers = {
    getAllFaculties,
    getSingleFaculty
}