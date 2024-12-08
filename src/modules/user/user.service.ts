/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus  from 'http-status';

import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
// import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utilis';
import AppError from '../../app/errors/AppError';
import mongoose from 'mongoose';

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

    // create a user(transaction1)
    const newUser = await User.create([userData],{session});

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST,'Field create a user')

      
    }
    // set id , _id as user
    payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
// create student (transaction2)
      const newStudent = await Student.create([payload],{session});
      if(!newStudent){
        throw new AppError(httpStatus.BAD_REQUEST,'Field to create a student')
      }

      await session.commitTransaction()
      await session.endSession()
      return newStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST,"Field to create student")

  }


};

export const UserServices = {
  createStudentIntoDB,
};