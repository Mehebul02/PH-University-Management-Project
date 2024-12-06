import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";



class AppError extends Error {
    public statusCode:number
    constructor(statusCode:number, message:string, stack="") {
        super(message);
        this.statusCode =statusCode
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
        
    }
    
}

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
        throw new AppError(404,'The department already exist')
    }
    next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery()
    const isDepartmentExist = await AcademicDepartment.findOne(query)
    if (!isDepartmentExist) {
        throw new AppError(404,'Department dose not exist!')
    }
    next()

})

export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema
);