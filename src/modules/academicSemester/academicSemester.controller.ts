import httpStatus  from 'http-status';
import {  RequestHandler } from "express";
import catchAsync from "../../app/utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";
import sendResponse from "../../app/utils/sendResponse";


const createAcademicSemester:RequestHandler =catchAsync(async(req,res,)=>{
    const result =await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic semester is Create successfully",
        data:result
    })

})


export const AcademicSemesterControllers = {
    createAcademicSemester
}