import { TFaculty } from './faculty.interface';
import QueryBuilder from "../../app/builder/QueryBuilder"
import { FacultySearchableFields } from "./faculty.constant"
import { Faculty } from "./faculty.model"
import mongoose from 'mongoose';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';


const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
    const facultyQuery = new QueryBuilder(Faculty.find().populate("academicDepartment"), query,)
        .search(FacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await facultyQuery.modelQuery
    return result

}

const getSingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findById(id).populate("academicDepartment")
    return result
}


const updatedFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
    const { name, ...remainingFacultyData } = payload
    const modifiedUpdateData: Record<string, unknown> = {
        ...remainingFacultyData
    }


    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name.${key}`] = value;
        }
    }

    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, { new: true, runValidators: true, })
    return result
}

const deleteFacultyFromDB = async (id: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const deletedFaculty = await Faculty.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedFaculty) {
            throw new AppError(httpStatus.BAD_REQUEST, "Faculty to delete field ")
        }

        // get user _id from deletedFaculty
        const userId = deletedFaculty.user

        const deleteUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session })

        console.log("Deleted Faculty:", deletedFaculty);
        console.log("User ID:", userId);

        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "Fileted to delete user ")
        }

        await session.commitTransaction()
        await session.endSession()
        return deletedFaculty

    } catch (error: any) {

        await session.abortTransaction()
        await session.endSession()
        throw new Error(error)

    }
}



export const FacultyServices = {
    getAllFacultiesFromDB,
    getSingleFacultyFromDB,
    updatedFacultyIntoDB,
    deleteFacultyFromDB
}