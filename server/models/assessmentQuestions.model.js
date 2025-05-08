import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Assessment from "./assessment.model.js";
import Question from "./question.model.js";

const AssessmentQuestion = sequelize.define(
    "AssessmentQuestion",
    {
        // id:{
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        //     primaryKey: true,
        // },
        assessmentId:{
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: "assessments",
                key: "id"
            },
            onDelete: "CASCADE",
        },
        questionId:{
            type:DataTypes.UUID,
            allowNull: false,
            references:{
                model: "questions",
                key: "id"
            },
            onDelete: "CASCADE",
        }
    },
    {
        timestamps: false,
        tableName: "assessment_questions",  
    },
);

export default AssessmentQuestion;