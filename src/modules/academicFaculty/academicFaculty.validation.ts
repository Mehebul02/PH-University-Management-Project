import { z } from "zod";


const academicFacultySchema = z.object({
    body:z.object({
        name:z.string({
            invalid_type_error:"Academic Faculty must be string"
        }),
    })
})

export const AcademicFacultyValidation ={
    academicFacultySchema
}