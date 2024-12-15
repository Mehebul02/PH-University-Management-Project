import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AdminServices } from "./admin.service";



const getAllAdmin = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllAdminsFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admins are retrieved successfully',
        data: result,
    })
})





export const AdminControllers = {
    getAllAdmin
}