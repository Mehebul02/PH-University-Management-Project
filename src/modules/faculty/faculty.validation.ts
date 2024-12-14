import {  z } from "zod";




const createUserNameValidationSchema = z.object({
    firstName: z.string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: "First Name must start with a capital letter"
        }),
    middleName: z.string(),
    lastName: z.string()
})

export const createFacultyValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        faculty: z.object({
            designation: z.string(),
            name: createUserNameValidationSchema,
            gender:z.enum([...Gender] as [string, ...string[]])
        })
    })
})