import { Router } from "express";
import validateRequest from "../../app/utils/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";



const router = Router()

router.post('/create-academic-faculty', validateRequest(AcademicFacultyValidation.createAcademicFacultySchema), AcademicFacultyControllers.createAcademicFaculty)
router.get('/:facultyId',AcademicFacultyControllers.getSingleAcademicFaculty)
router.patch('/:facultyId',validateRequest(AcademicFacultyValidation.updateAcademicFacultySchema),)
router.get('/',AcademicFacultyControllers.getAllAcademicFaculty)


export const AcademicFacultyRoute = router