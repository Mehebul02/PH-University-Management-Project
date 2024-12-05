import { z } from "zod";


const createAcademicFacultySchema = z.object({
    body:z.object({
        name:z.string({
        invalid_type_error:"Academic Faculty must be string"
    }),
    })
})
const updateAcademicFacultySchema = z.object({
    body:z.object({
        name:z.string({
        invalid_type_error:"Academic Faculty must be string"
    }),
    })
})

export const AcademicFacultyValidation ={
    createAcademicFacultySchema,
    updateAcademicFacultySchema
}