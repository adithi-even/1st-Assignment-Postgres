import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Question from "./question.model.js";

const Option = sequelize.define(
    "Option",
    {
        id: {
            type: DataTypes.UUID,
            defaultvalue: DataTypes.UUIDV4,
            primaryKey: true
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
                model: "Question",
                key: "id"
            },
            onDelete: "CASCADE",
        },

    },{
        timestamps: false,
        tableName: "options",
    }
);



export default Option;