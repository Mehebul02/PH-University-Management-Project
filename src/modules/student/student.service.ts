/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../app/errors/AppError'
import { User } from '../user/user.model';

const getAllStudentsFromDB = async () => {
    const result = await Student.find().
        populate("admissionSemester").populate({ path: "academicDepartment", populate: { path: "academicFaculty" } })
    return result
}

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({id}).populate({ path: "academicDepartment", populate: { path: "academicFaculty" } })
    return result
}
const updateStudentFromDB = async (id: string) => {
    const result = await Student.findOne({id}).populate({ path: "academicDepartment", populate: { path: "academicFaculty" } })
    return result
}

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session })

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Student to delete field')
        }

        const deleteUser = await User.findOneAndUpdate({ id }, { isDelete: true }, { new: true, session })


        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "User to delete field")
        }
        await session.commitTransaction()
        await session.endSession()
        return deletedStudent

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()

    }

}

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentFromDB,
    deleteStudentFromDB,
}
