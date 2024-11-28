import { TUser } from "./user.interface";
import { USer } from "./user.model";



const createStudentIntoDB = async (studentData: TUser) => {
    const result = await USer.create(studentData)
    return result
}

export const userService = {
    createStudentIntoDB
}