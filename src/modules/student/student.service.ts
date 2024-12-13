/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../app/errors/AppError'
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

    console.log('base query', query)
    const queryObj ={...query} //copy the query




    const studentSearchableField = ['email', 'name.firstName', 'presentAddress']

    let searchTerm = ''
    if (query?.search) {
        searchTerm = query.searchTerm as string
    }
    

    const searchQuery = Student.find({
        $or: studentSearchableField.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    })

    // filtering 
    const excludeField =["searchTerm"]
    excludeField.forEach((field)=>delete queryObj[field])
    
    const result = await Student.find(query).
        populate("admissionSemester").populate({ path: "academicDepartment", populate: { path: "academicFaculty" } })
    return result
}
const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({ id }).populate({ path: "academicDepartment", populate: { path: "academicFaculty" } })
    return result
}
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {

    const { name, guardian, localGuardian, ...remainingStudentData } = payload
    const modifiedUpdateData: Record<string, unknown> = { ...remainingStudentData }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name.${key}`] = value
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdateData[`guardian.${key}`] = value
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdateData[`localGuardian.${key}`] = value
        }
    }
    console.log(modifiedUpdateData);
    const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, { new: true, runValidators: true })
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
        throw new AppError(httpStatus.httpStatus, "Field to delete student")

    }

}

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentFromDB,
    deleteStudentFromDB,
}
