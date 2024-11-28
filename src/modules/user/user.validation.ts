import { boolean, z } from "zod";


const userSchema = z.object({
    id: z.string(),
    password: z.string().max(20, { message: "password can not be more then 20 characters" }),
    passwordChange: z.boolean().optional().default(true),
    role:z.enum(['student','admin','faculty']),
    status:z.enum(['in-progress','blocked']).default('in-progress'),
    isDeleted:z.boolean().optional().default(false)

})

export  userSchema