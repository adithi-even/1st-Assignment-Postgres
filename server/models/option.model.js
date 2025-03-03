import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Question from "./question.model.js";

const option = sequelize.define(
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
        timestamps: true,
        tableName: "options",
    }
);



export default Option;