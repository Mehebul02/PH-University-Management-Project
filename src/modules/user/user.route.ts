import express, { Router } from 'express'
import { userControllers } from './user.controller'
import { studentValidationSchema } from '../student/student.validation'
import validateRequest from '../../app/utils/validateRequest'

const router = Router()


router.use('/create-student', validateRequest(studentValidationSchema), userControllers.createStudent)

export const userRouters = router