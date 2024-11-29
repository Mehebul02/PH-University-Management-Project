import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { USer } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {


    const userData: Partial<TUser> = {}

    // if password is not given, use default password 
    userData.password = password || (config.default_password as string)


    // student role 
    userData.role = 'student'
    const newUser = await USer.create(userData)

    // set manually generated id

    userData.id = '251000'

    // create student 
    if (Object.keys(newUser).length) {
        // set id, user _id 
        studentData.id = newUser.id;
        studentData.user = newUser._id;
        const newStudent = await Student.create(studentData)
        return newStudent
    }


}

export const userService = {
    createStudentIntoDB,
}
