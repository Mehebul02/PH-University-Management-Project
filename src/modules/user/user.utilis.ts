// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
// import { User } from "./user.model";

import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// Function to find the last student ID
// const findLastStudentId = async () => {
//     const lastStudent = await User.findOne(
//         { role: "student" },
//         { id: 1, _id: 0 }
//     )
//         .sort({ createdAt: -1 })
//         .lean();

//     return lastStudent?.id ? lastStudent.id : undefined;
// };

const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    return lastStudent?.id ? lastStudent.id : undefined;
  };

// Function to generate a new student ID
// export const generateStudentId = async (payload: TAcademicSemester) => {
//     const lastStudentId = await findLastStudentId();

//     // Default current ID to "0000" if no students exist
//     let currentId = "0000";

//     if (lastStudentId) {
//         const lastStudentSemesterCode = lastStudentId.substring(4, 6); // Extract semester code
//         const lastStudentYear = lastStudentId.substring(0, 4); // Extract year

//         if (
//             lastStudentSemesterCode === payload.code &&
//             lastStudentYear === payload.year
//         ) {
//             // Extract the last increment and assign it to currentId
//             currentId = lastStudentId.substring(6);
//         }
//     }

//     // Increment and format the new ID
//     let incrementedId = (Number(currentId) + 1).toString().padStart(4, "0");
//     incrementedId = `${payload.year}${payload.code}${incrementedId}`; // Format: YYYYCC####
//     return incrementedId
// };

export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();
  
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
    const lastStudentYear = lastStudentId?.substring(0, 4);
  
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;
  
    if (
      lastStudentId &&
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentYear === currentYear
    ) {
      currentId = lastStudentId.substring(6);
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `${payload.year}${payload.code}${incrementId}`;
  
    return incrementId;
  };



//   generate faculty id
export const findLastFacultyId = async () => {
    const lastFaculty = await User.findOne(
      {
        role: 'faculty',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
  };

export const generateFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();
  
    if (lastFacultyId) {
      currentId = lastFacultyId.substring(2);
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `F-${incrementId}`;
  
    return incrementId;
  };

// year semesterCode 4digit number


// const findLastStudentId = async () => {
//   const lastStudent = await User.findOne(
//     {
//       role: 'student',
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   //2030 01 0001
//   return lastStudent?.id ? lastStudent.id : undefined;
// };

// export const generateStudentId = async (payload: TAcademicSemester) => {
//   // first time 0000
//   //0001  => 1
//   let currentId = (0).toString(); // 0000 by deafult

//   const lastStudentId = await findLastStudentId();
//   // 2030 01 0001
//   const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
//   const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
//   const currentSemesterCode = payload.code;
//   const currentYear = payload.year;

//   if (
//     lastStudentId &&
//     lastStudentSemesterCode === currentSemesterCode &&
//     lastStudentYear === currentYear
//   ) {
//     currentId = lastStudentId.substring(6); // 00001
//   }

//   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//   incrementId = `${payload.year}${payload.code}${incrementId}`;

//   return incrementId;
// };