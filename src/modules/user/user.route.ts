import  { Router } from 'express'
import { userControllers } from './user.controller'
import { createStudentValidationSchema } from '../student/student.validation'
import validateRequest from '../../app/utils/validateRequest'

const router = Router()

router.use('/create-student', validateRequest(createStudentValidationSchema), userControllers.createStudent)

export const userRouters = router