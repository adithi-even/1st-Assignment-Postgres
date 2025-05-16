import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Question from "./question.model.js";

const Option = sequelize.define(
    "Option",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false

        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        questionId:{
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: "questions",
                key: "id"
            },
            onDelete: "CASCADE",
        },
        order:{ 
            type: DataTypes.INTEGER,
            allowNull: false
        } 
        //adding this order field so that the optionsarray will get updated in the same order as it is added while updating 

    },{
        timestamps: false,
        tableName: "options",
    }
);



export default Option;