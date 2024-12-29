import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { SemesterRegistration } from "../semesterRegistrantion/semesterRegistrantion.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDeparment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";


const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty } = payload

    const isSemesterRegistrationExits = await SemesterRegistration.findById(semesterRegistration)


    if (!isSemesterRegistrationExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found')
    }
    const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty)


    if (!isAcademicFacultyExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found')
    }

    const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment)

    if (!isAcademicDepartmentExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found')
    }

    const isCourseExits = await Course.findById(course)

    if (!isCourseExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found')
    }
    const isFacultyExits = await Faculty.findById(faculty)

    if (!isFacultyExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'faculty not found')
    }


    const result = await OfferedCourse.create(payload)




    return result
}

export const OfferedCourseServices = {
    createOfferedCourseIntoDB
}