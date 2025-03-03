import { DataTypes } from "sequelize";
import Sequelize from "../config/sequelize";

const Assessment = Sequelize.define(
    "Assessment",
    {
        assessmentId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        
    }
)