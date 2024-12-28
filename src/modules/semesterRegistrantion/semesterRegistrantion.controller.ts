import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistrantion.service";



const createSemesterRegistration = catchAsync(async (req, res) => {

  const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created successfully',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {

  const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semesters registration is retrieved successfully',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {

  const {id} = req.params

  const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semesters registration is retrieved successfully',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {

  const {id} = req.params

  const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id,req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semesters registration updated successfully',
    data: result,
  });
});


export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration
}