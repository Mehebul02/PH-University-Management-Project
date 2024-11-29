import config from '../../config'
import { TStudent } from '../student/student.interface'
import { TUser } from './user.interface'
import { USer } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    // if password is not given, use default password 
    if (!password) {
        password = config.default_password as string
    }
    const result = await USer.create(studentData)
    return result
}

export const userService = {
    createStudentIntoDB,
}
