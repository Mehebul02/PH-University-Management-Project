import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import validateRequest from "../../app/utils/validateRequest";


const router = Router()

router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),AcademicSemesterControllers.createAcademicSemester)

router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
  );
  
  router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoute = router