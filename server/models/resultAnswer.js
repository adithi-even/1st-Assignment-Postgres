import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import resultModel from "./result.model.js";
import Question from "./question.model.js";

const ResultAnswer = sequelize.define(
    "ResultAnswer",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        resultId:{
            type:DataTypes.UUID,
            allownull:false,
            references:{
                model:"Result",
                key:"id"
            },
            onDelete:"CASCADE",
        },
        questionId:{
            type:DataTypes.UUID,
            allownull:false,
            references:{
                model:"Question",
                key:"id",
            },
            onDelete:"CASCADE",
        },
        selectedOptionIndex:{
            type:DataTypes.INTEGER,
            allownull:false,
        },
        isCorrect:{
            type:DataTypes.BOOLEAN,
            allownull:false,
        },
        

    },
    {
        timestamps: true,
        tableName: "result_answers",
    }

);

export default ResultAnswer;