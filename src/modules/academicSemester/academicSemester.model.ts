import  httpStatus  from 'http-status';
import { model, Schema } from "mongoose";
import { TAcademicSemester, } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academic.constant";
import AppError from "../../app/errors/AppError";


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: { type: String, required: true, enum: AcademicSemesterName },
    code: { type: String, required: true, enum: AcademicSemesterCode },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months },
    endMonth: { type: String, enum: Months }
},
    {
        timestamps: true
    }
)

academicSemesterSchema.pre('save', async function (next) {

    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    });
    if (isSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND,'Semester is al ready exists')
    }
    next()

})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)