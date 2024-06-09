import { Schema, model } from "mongoose";


const ToDoScheme = new Schema({
    title:{
        type: String,
        required: true
    },
    note:{
        type: String,
        unique: true,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null,
    }
}, {timestamps:true})

export const ToDo = model("ToDo", ToDoScheme)