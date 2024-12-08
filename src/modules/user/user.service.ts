
import mongoose, { mongo } from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
// import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utilis';

// import { generatedStudent } from './user.utilis';
// import { generatedStudent } from './user.utilis';


const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';



  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //set manually generated it
    userData.id = await generateStudentId(admissionSemester);
    // userData.id = '423423423';

    // create a user
    const newUser = await User.create(userData);

    //create a student
    if (Object.keys(newUser).length) {
      // set id , _id as user
      payload.id = newUser.id;
      payload.user = newUser._id; //reference _id

      const newStudent = await Student.create(payload);
      return newStudent;
    }
  } catch (err) {

  }


};

export const UserServices = {
  createStudentIntoDB,
};