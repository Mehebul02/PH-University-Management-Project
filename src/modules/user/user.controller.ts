import httpStatus  from 'http-status';


import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";


const createStudent: RequestHandler = catchAsync(async (req, res,) => {

    const { password, student: studentData } = req.body;
    // const zodParsedData = studentValidationSchema.parse(studentData);
    console.log("Password:", password);
    console.log("Student Data:", studentData);
   
    const result = await UserServices.createStudentIntoDB(
        password,
        studentData,
    );


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result,
    })
})




export const userControllers = {
    createStudent
}


