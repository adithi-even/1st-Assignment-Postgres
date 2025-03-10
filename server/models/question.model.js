import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

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
        correctoptionIndex:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps:true,
        tebleName: "questions",
    }
);

export default Question;