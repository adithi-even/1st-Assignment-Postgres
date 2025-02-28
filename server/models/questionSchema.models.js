import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
    {
        question:{
             type: String,
            required: true
         },

        options: { 
            type: [String],
            required: true
        }, // Array of strings

        correctOptionIndex: {
             type: Number,
             required: true
        }, // Index of the correct answer
  },{
    timestamps: true,
  }
);
  
  export const  Question = mongoose.model('Question', questionSchema);


