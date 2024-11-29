import express, { Request, Response } from 'express'
import {  UserServices } from './user.service'

const createStudent = async (req: Request, res: Response,) => {
    try {
        const { password, student: studentData } = req.body
        // const zodParsedData = userValidation.parse(studentData)
        const result = await UserServices.createStudentIntoDB(password, studentData)
        res.status(200).json({
            status: true,
            message: 'User Created successfully',
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Student is retrieved succesfully'

        })
    }
}




export const userControllers = {
    createStudent
}