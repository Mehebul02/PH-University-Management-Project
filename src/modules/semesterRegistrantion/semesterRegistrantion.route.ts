import { Router } from "express";
import validateRequest from "../../app/utils/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistrantion.validation";
import { SemesterRegistrationControllers } from "./semesterRegistrantion.controller";



const router = Router()

router.post(
     '/create-semester-registration',
     validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),
     SemesterRegistrationControllers.createSemesterRegistration)
router.get('/:id', SemesterRegistrationControllers.getSingleSemesterRegistration)
router.patch('/:id', SemesterRegistrationControllers.updateSemesterRegistration)
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration)


export const SemesterRegistrationRoutes = router