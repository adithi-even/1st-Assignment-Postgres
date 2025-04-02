import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// import User from "./user.model.js";

const Assessment = sequelize.define(
    "Assessment",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
         createdBy:{
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: "User",
                key: "id"
            },
            onDelete: "CASCADE",
        },
        
    },{
        timestamps:true,
        tableName: "assessments",
    }
)

export default Assessment;
