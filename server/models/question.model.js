import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Question = sequelize.define(
    "Question",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        question:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        correctOptionIndex:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps:true,
        tableName: "questions",
    }
);

export default Question;