import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema(
    {
        title: 
        { 
            type: String,
            required: true
        },
        questions: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            }
        ], 
        createdBy: 
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User',
             required: true
        }, 
  },
  {
    timestamps: true
  }
);
  
export const Assessment = mongoose.model('Assessment', assessmentSchema);

// if there is an export default in the file, import would be: Assessment
// if there is an export const in the file, import would be: {Assessment}