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
const getSingleAdmin = catchAsync(async (req, res) => {

    const { id } = req.params
    const result = await AdminServices.getSingleAdminFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admins are retrieved successfully',
        data: result,
    })
})





export const AdminControllers = {
    getAllAdmin,
    getSingleAdmin
}