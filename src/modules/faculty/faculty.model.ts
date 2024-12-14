import { Schema } from "mongoose";


const userNameSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxLength: [20, "Name can not be more than 20 characters"]
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        maxLength: [20, "Name can not be more then 20 characters"]
    }
})