import { z } from "zod";


const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must be string",
            required_error: 'Name is required'

        }),
        AcademicFaculty: z.string({
            invalid_type_error: 'Academic faculty must be string',
            required_error: "Faculty is required"
        })
    })
})



export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema
}