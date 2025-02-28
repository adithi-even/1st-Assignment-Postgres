import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
    {
        assesmentId:{
            type : mongoose.Schema.Types.ObjectId,
            ref :'Assessment',
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        score:{
            type:Number,
            required:true
        },
        answers:[
            {
                questionId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Question',
                },
                selectedOptionIndex:{
                    type:Number,
                },
                isCorrect:{
                    type:Boolean,
                },
            },
        ],
        


    },{
        timestamps:true,
    }
);

export const Result = mongoose.model('Result', resultSchema);
