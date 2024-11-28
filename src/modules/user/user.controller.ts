
import express, { Request, Response } from 'express'
import { userValidation } from './user.validation'
import { userService } from './user.service'

const createStudentIntoDB = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body
        const zodParsedData = userValidation.parse(studentData)
        const result = await userService.createStudentIntoDB()
    }
    catch (error) {
        status: false
    }
}