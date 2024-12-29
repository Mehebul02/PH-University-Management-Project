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

    const { semesterRegistration, academicFaculty, academicDepartment, section, course, faculty } = payload

    const isSemesterRegistrationExits = await SemesterRegistration.findById(semesterRegistration)


    if (!isSemesterRegistrationExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found')
    }

    const academicSemester = isSemesterRegistrationExits.academicSemester

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


    const isAcademicBelongFaculty = await AcademicDepartment.findOne({
        _id:academicDepartment,
        academicFaculty
    })

    if (!isAcademicBelongFaculty) {
        throw new AppError(httpStatus.BAD_REQUEST, `This ${isAcademicDepartmentExits.name} is not belong to this ${isAcademicFacultyExits.name}`)

    }


    const isSameOfferedCourseExitsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    })

    if(isSameOfferedCourseExitsWithSameRegisteredSemesterWithSameSection){
        throw new AppError(httpStatus.BAD_REQUEST, `Offered course with same section is already exits!`)
    }

    const result = await OfferedCourse.create({ ...payload, academicSemester })




    return result
}

export const OfferedCourseServices = {
    createOfferedCourseIntoDB
}