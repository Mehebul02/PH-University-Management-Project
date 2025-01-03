import { z } from "zod";


const preRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
})


const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourse: z.array(preRequisiteCourseValidationSchema),
        isDeleted: z.boolean(),
    })
})
const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCourse: z.array(preRequisiteCourseValidationSchema).optional(),
        isDeleted: z.boolean().optional(),
    })
})
// const updateCourseValidationSchema = createCourseValidationSchema.partial()


export const CourseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema,

}