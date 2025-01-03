import { Router } from "express";
import validateRequest from "../../app/utils/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = Router()
router.post('/create-academic-department', validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartment)
router.get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepartment)
router.patch('/:departmentId',validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment)
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment)

export const AcademicDepartmentRoutes = router