import { Router } from "express";
import validateRequest from "../../app/utils/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistrantion.validation";
import { SemesterRegistrationControllers } from "./semesterRegistrantion.controller";



const router = Router()

router.post(
    '/create-semester-registration', 
    validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),
     SemesterRegistrationControllers.createSemesterRegistration)



     export const SemesterRegistrationRoutes = router