import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistrantion.interface";
import { SemesterRegistration } from "./semesterRegistrantion.model";
import QueryBuilder from "../../app/builder/QueryBuilder";


const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;

    // check if there anẏ register semester that is already 'UPCOMING' | 'ONGOING'

    const isThereUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }]
    })

    if (isThereUpcomingOrOngoingSemester) {
        throw new AppError(httpStatus.BAD_REQUEST, `There is already a ${isThereUpcomingOrOngoingSemester.status}`)
    }


    // check if the semester is exit 
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)

    if (!isAcademicSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic semester not found')
    }

    // check if the semester is already registered!

    const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemester })

    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, 'This semester is already registered!')
    }
    const result = await SemesterRegistration.create(payload)
    return result

}


const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {


    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find()
        .populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await semesterRegistrationQuery.modelQuery
    return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id).populate('academicSemester')
    return result
}
const updateSemesterRegistrationIntoDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id)
    return result
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}