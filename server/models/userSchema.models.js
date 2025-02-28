import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt '

const userSchema = new mongoose.Schema (
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },
        role:{
            type:String,
            enum:['content_creator','end_user'],
            required:true
        },
        password:{
            type:String,
            required:[true, "Password is required"],
        },
        refreshToken:{
            type:String,

        }
        
    },{
        timestamps:true,
    }
)


export const User = mongoose.model("User" , userSchema);

