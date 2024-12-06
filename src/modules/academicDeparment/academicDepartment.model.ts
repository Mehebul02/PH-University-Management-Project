import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: { type: Schema.Types.ObjectId, ref: "Academicfaculty" }
    },
    {
        timestamps: true,
    },
);

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartExist = await AcademicDepartment.findOne({
        name: this.name
    })
    if (isDepartExist) {
        throw new Error('The department already exist')
    }
    next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema
);