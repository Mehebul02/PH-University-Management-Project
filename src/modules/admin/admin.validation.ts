import { z } from "zod";
import { BloodGroup, Gender } from "./admin.constant";


const createUserNameValidationSchema = z.object({
    name:z.string().min(1).max(20),
    middleName:z.string().max(20),
    lastName:z.string().max(20)
})

const createAdminValidation = z.object({
    body:z.object({
        admin:z.object({
            name:createUserNameValidationSchema,
            designation: z.string().max(30).optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
        })
    })
})