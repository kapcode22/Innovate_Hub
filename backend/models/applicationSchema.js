import mongoose from "mongoose";
import validator from "validator";

const applicationSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name!"],
        minLength: [3, "Name must contain at least 3 character"],
        maxLength: [30, "Name connot exceed 30 cahracters!"],
    },
    email: {
        type: String,
        required: [true, "please provide your email!"],
        validate: [validator.isEmail, "please provide a valid email"],
    },
    phone: {
        type: Number,
        required: [true, "please provide your phone number!"],
    },
    coverLetter: {
        type: String,
        required: [true, "please provide your cover Letter"],
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User",
           required:true,
        },
        role:{
            type:String,
            enum:['Project Seeker'],
            required:true
        },
    },
    employerID:{
        user:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User",
           required:true,
        },
        role:{
            type:String,
            enum:['Project Head'],
            required:true
        },
    }
   
});

// creating project model
export const Application=mongoose.model("Appliction",applicationSchema);