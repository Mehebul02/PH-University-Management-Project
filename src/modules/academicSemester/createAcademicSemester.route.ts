import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../app/utils/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";


const route = Router()

route.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),AcademicSemesterControllers.createAcademicSemester)

export const AcademicSemesterRoute = route