import { Schema, model } from "mongoose";


const UserScheme = new Schema({
    userName:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    birthDate:{
        type: Date
    },
    userType:{
        type: [String],
        default:[]
    },
    createdAt:{
        type: Date,
        required:true
    },
    deletedAt:{
        type: Date,
        required:false
    }
})

export const User = model("User", UserScheme)