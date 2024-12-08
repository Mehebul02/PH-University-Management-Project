import httpStatus from 'http-status';
import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../app/errors/AppError";





const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" },
    },
    {
        timestamps: true,
    }
);

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartExist = await AcademicDepartment.findOne({
        name: this.name
    })
    if (isDepartExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'The department already exist')
    }
    next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery()
    const isDepartmentExist = await AcademicDepartment.findOne(query)
    if (!isDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Department dose not exist!')
    }
    next()

})

export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema
);