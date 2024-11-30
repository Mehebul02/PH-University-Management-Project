import httpStatus from 'http-status';
import express, { RequestHandler, } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../app/utils/sendResponse'
import catchAsync from '../../app/utils/catchAsync';


const createStudent: RequestHandler = catchAsync(async (req, res, next) => {

    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
        password,
        studentData,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created succesfully',
        data: result,
    })
})




export const userControllers = {
    createStudent
}


