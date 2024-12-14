import express from 'express'
import { FacultiesControllers } from './faculty.controller'


const router = express.Router()

router.get('/', FacultiesControllers.getAllFaculties)

export const FacultyRoutes = router
