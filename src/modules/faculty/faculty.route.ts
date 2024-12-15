import express from 'express'
import { FacultiesControllers } from './faculty.controller'


const router = express.Router()


router.get('/:id', FacultiesControllers.getSingleFaculty)
router.patch('/:id', FacultiesControllers.updateFaculty)
router.delete('/:id', FacultiesControllers.deleteFaculty)
router.get('/', FacultiesControllers.getAllFaculties)

export const FacultyRoutes = router
