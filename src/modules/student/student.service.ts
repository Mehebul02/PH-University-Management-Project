/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../app/errors/AppError'
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

    console.log('base query', query)
    const queryObj = { ...query } //copy the query




    const studentSearchableField = ['email', 'name.firstName', 'presentAddress']

    let searchTerm = ''
    if (query?.searchTerm) {
        searchTerm = query.searchTerm as string
    }


    const searchQuery = Student.find({
        $or: studentSearchableField.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    })

    // filtering 
    const excludeField = ["searchTerm", "sort", "limit", 'page',"fields"]
    console.log({ query }, { queryObj });
    excludeField.forEach((el) => delete queryObj[el])
    // console.log(query,queryObj)

    const filterQuery = searchQuery.find(queryObj).
        populate("admissionSemester").populate({ path: "academicDepartment", populate: { path: "academicFaculty" } })

    // sorting 
    let sort = '-createdAt'
    if (query.sort) {
        sort = query.sort as string
    }

    const sortQuery = filterQuery.sort(sort)


    // pagination 
    let page = 1
    let limit = 1
    let skip = 0

    if (query.limit) {
        limit = Number(query.limit);
    }

    if (query.page) {
        page = Number(query.page)
        skip = (page - 1) * limit
    }
    const paginationQuery = sortQuery.skip(skip)

    const limitQuery =  paginationQuery.limit(limit)


    // field limitation

    let fields = '-__v';


    // fields name,email 
    // fields name email 
    if(query.fields){
        fields = (query.fields as string).split(',').join(' ');
        console.log(fields);
    }

    const fieldQuery = await limitQuery.select(fields);
    return fieldQuery
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
        throw new AppError(httpStatus.BAD_REQUEST, "Field to delete student")

    }

}

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentFromDB,
    deleteStudentFromDB,
}
