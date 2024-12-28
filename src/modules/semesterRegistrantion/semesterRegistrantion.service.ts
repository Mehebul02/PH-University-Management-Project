import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistrantion.interface";
import { SemesterRegistration } from "./semesterRegistrantion.model";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistrantion.constrant";


const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;

    // check if there anẏ register semester that is already 'UPCOMING' | 'ONGOING'

    const isThereUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }]
    })

    if (isThereUpcomingOrOngoingSemester) {
        throw new AppError(httpStatus.BAD_REQUEST, `There is already a an ${isThereUpcomingOrOngoingSemester.status} register semester!`)
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
const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

    // if the requested semester registration , We will not update anything

    // check if the semester is already registered!

    const isSemesterRegistrationExists = await SemesterRegistration.findById(id)

    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !')
    }


    const currentSemesterStatus = isSemesterRegistrationExists?.status
    const requestedStatus = payload?.status

    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`)
    }
    // return result

    // UPCOMING ---->ONGOING---->ENDED 

    if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
        throw new AppError
            (httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`)

    }
    if (currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
        throw new AppError
            (httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`)

    }
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return result;
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}