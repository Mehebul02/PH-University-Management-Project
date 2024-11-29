import express, { Request, Response } from 'express'
import { userService } from './user.service'

const createStudentIntoDB = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body
        // const zodParsedData = userValidation.parse(studentData)
        const result = await userService.createStudentIntoDB(password, studentData)
        res.status(200).json({
            status: true,
            message: 'User Created successfully',
            data: result
        })
    } catch (error) {
        console.log(error);

    }
}
