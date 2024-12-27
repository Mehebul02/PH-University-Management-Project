import mongoose, { Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistrantion.interface";
import { semesterRegistrationStatus } from "./semesterRegistrantion.constrant";




const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
    {
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "AcademicSemester"
        },
        status: {
            type: String,
            enum: semesterRegistrationStatus,
            default: 'UPCOMING'
        },
        startDate: {
            type: Date,
            required: true

        },
        endDate: {
            type: Date,
            required: true
        },
        minCredit: {
            type: Number,
            required: true,
            default: 3
        },
        maxCredit: {
            type: Number,
            default: 15
        }
    },
    {
        timestamps: true
    }
)