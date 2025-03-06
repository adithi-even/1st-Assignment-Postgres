import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const ResultAnswer = sequelize.define(
    "ResultAnswer",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        resultId:{
            type:DataTypes.UUID,
            allownull:false,
            references:{
                model:"Result",
                key:"id"
            },
            onDelete:"CASCADE",
        },
        

    }

)