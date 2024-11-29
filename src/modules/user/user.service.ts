import config from '../../config'
import { TStudent } from '../student/student.interface'
import { NewUser } from './user.interface'
import { USer } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {


    const user: NewUser = {}

    // if password is not given, use default password 
    user.password = password || (config.default_password as string)


    // student role 
    user.role = 'student'
    const result = await USer.create(user)

    // set manually generated id

    user.id = '251000'

    // create student 
    if (Object.keys(result).length) {
        // set id, user _id 
        studentData.id = result.id;
        studentData.user = result._id;
    }

    return result
}

export const userService = {
    createStudentIntoDB,
}
