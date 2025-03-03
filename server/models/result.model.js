import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const resultModel = sequelize.define(
    "Result",
    {
        assessmentId:{
            type: DataTypes.NUMBER,
            allowNull:false,
        },
        userId:{
            type: DataTypes.NUMBER,
            allowNull:false,
            
        },
        score:{
            type: DataTypes.NUMBER,
            allowNull:false,

        },
        answers:{
            questionId:{
                type:DataTypes 
            },
            selectedoptionIndex:{
                type: DataTypes

            },isCorrect:{
                type: DataTypes
            },
        }
    },{
        timestamps:true
    }
)

export default resultModel;