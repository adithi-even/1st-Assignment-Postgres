import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./user.model.js";
import Assessment from "./assessment.model.js";

const resultModel = sequelize.define(
    "Result",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
        },
        assessmentId:{
            type: DataTypes.UUID,
            allowNull:false,
            references:{
                model: "assessments",
                key: "id"
            },
            onDelete: "CASCADE",
        },
        userId:{
            type: DataTypes.UUID,
            allowNull:false,
            references:{
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE",            
        },
        score:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
    },
    {
        timestamps:true,
        tableName: "results"
    }
)

export default resultModel;