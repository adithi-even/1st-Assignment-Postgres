import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import User from "./user.models";
import Assessment from "./assessment.model";

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
                model: "assessment",
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
        timestamps:true
    }
)

export default resultModel;