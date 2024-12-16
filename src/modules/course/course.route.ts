import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../app/utils/validateRequest';
import { CourseValidation } from './course.validation';

const router = express.Router()


router.post('/create-course', validateRequest(CourseValidation.createCourseValidationSchema), CourseController.createCourse)
router.get('/:id', CourseController.getSingleCourse)
router.delete('/:id', CourseController.deleteCourse)
router.get('/', CourseController.getAllCourse)



export const CourseRoutes = router