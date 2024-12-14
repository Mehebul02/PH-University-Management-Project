/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus  from 'http-status';

import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
// import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utilis';
import AppError from '../../app/errors/AppError';
import mongoose from 'mongoose';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDeparment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';

// import { generatedStudent } from './user.utilis';
// import { generatedStudent } from './user.utilis';


// const createStudentIntoDB = async (password: string, payload: TStudent) => {
  
//   // create a user object
//   const userData: Partial<TUser> = {};

//   //if password is not given , use default password
//   userData.password = password || (config.default_password as string);

//   //set student role
//   userData.role = 'student';



//   //find academic semester info
//   const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

//   const session = await mongoose.startSession()
//   try {
//     session.startTransaction()
//     //set manually generated it
//     userData.id = await generateStudentId(admissionSemester);
//     // userData.id = '423423423';

//     // create a user(transaction1)
//     const newUser = await User.create([userData],{session});

//     //create a student
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST,'Field create a user')

      
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id;
//       payload.user = newUser[0]._id; //reference _id
// // create student (transaction2)
//       const newStudent = await Student.create([payload],{session});
//       if(!newStudent){
//         throw new AppError(httpStatus.BAD_REQUEST,'Field to create a student')
//       }

//       await session.commitTransaction()
//       await session.endSession()
//       return newStudent;
//   } catch (error:any) {
//     await session.abortTransaction()
//     await session.endSession()
//     throw new Error(error)

//   }


// };
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};


// faculty 


const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   // Create a user object
//   const userData: Partial<TUser> = {};

//   // If password is not given, use default password
//   userData.password = password || (config.default_password as string);

//   // Set student role
//   userData.role = 'student';

//   // Find academic semester info
//   const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

//   if (!admissionSemester) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Invalid admission semester');
//   }

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     // Generate student ID
//     userData.id = await generateStudentId(admissionSemester);

//     // Create a user (transaction 1)
//     const newUser = await User.create([userData], { session });

//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a user');
//     }

//     // Set ID and _id as references in the payload
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id;

//     // Create student (transaction 2)
//     const newStudent = await Student.create([payload], { session });

//     if (!newStudent.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a student');
//     }

//     // Commit the transaction
//     await session.commitTransaction();
//     await session.endSession();

//     return newStudent;
//   } catch (error: any) {
//     // Roll back the transaction in case of an error
//     await session.abortTransaction();
//     await session.endSession();

//     // Check if the error is due to duplicate key
//     if (error?.code === 11000) {
//       throw new AppError(httpStatus.CONFLICT, 'Duplicate key error: ' + JSON.stringify(error.keyValue));
//     }

//     // Rethrow the error with a custom message
//     throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error?.message || 'An unknown error occurred');
//   }
// };


export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB
};