import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

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
                model: "Assessment",
                key: "id"
            },
            onDelete: "CASCADE",
        },
        userId:{
            type: DataTypes.UUID,
            allowNull:false,
            references:{
                model: "User",
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