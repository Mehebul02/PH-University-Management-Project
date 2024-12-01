import { model, Schema } from "mongoose";
import { TAcademicSemester, } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academic.constant";


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: { type: String, required: true, enum: AcademicSemesterName },
    code: { type: String, required: true, enum: AcademicSemesterCode },
    year: { type: Date, required: true },
    startMonth: { type: String, enum: Months },
    endMonth: { type: String, enum: Months }
},
    {
        timestamps: true
    }
)

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)