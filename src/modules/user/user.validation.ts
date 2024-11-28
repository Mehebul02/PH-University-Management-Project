import { z } from "zod";


const userValidationSchema = z.object({

    password: z.string({
        invalid_type_error: "Password must be string" }).
        max(20, { message: "password can not be more then 20 characters" }).optional(),
    role: z.enum(['student', 'admin', 'faculty']),

})

export const userValidation = {
    userValidationSchema
} 