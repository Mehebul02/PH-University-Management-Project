import httpStatus from "http-status"
import catchAsync from "../../app/utils/catchAsync"
import sendResponse from "../../app/utils/sendResponse"
import { OfferedCourseServices } from "./offeredCourse.services"


const createOfferedCourseIntoDB = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Offered course is created successfully',
            data: result
        })
})


export const OfferedCourseControllers = {
    createOfferedCourseIntoDB
}