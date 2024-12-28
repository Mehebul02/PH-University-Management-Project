import { Router } from "express";
import validateRequest from "../../app/utils/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controller";


const router = Router()

router.post('/create-offered-course', validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
OfferedCourseControllers.createOfferedCourseIntoDB)





export const OfferCourseRoutes = router