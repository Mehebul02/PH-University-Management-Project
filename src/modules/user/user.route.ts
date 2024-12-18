import { Router } from 'express'
import { UserControllers } from './user.controller'
import { createStudentValidationSchema } from '../student/student.validation'
import validateRequest from '../../app/utils/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidation } from '../admin/admin.validation'

const router = Router()

router.post('/create-student', validateRequest(createStudentValidationSchema), UserControllers.createStudent)

// router.post('/create-faculty', validateRequest(createFacultyValidationSchema), UserControllers.createFaculty)
router.post('/create-faculty',validateRequest(createFacultyValidationSchema),UserControllers.createFaculty,);
router.post('/create-admin', validateRequest(createAdminValidation),UserControllers.createAdmin)
export const userRouters = router