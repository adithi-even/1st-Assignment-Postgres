import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import resultModel from "./result.model";
import Question from "./question.model";

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
            allowNull:false,
            references:{
                model:"questions",
                key:"id",
            },
            onDelete:"CASCADE",
        },
        sele
        

    }

)