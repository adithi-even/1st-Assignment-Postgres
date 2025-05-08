import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const User = sequelize.define(
    "User",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true,
            }, 
        },
        role:{
            type: DataTypes.ENUM('content_creator','end_user'),
            allowNull:false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            
        },
        refreshToken:{
            type: DataTypes.STRING,
            allowNull:true, 

        }
    },
    {
        timestamps: true,
        tableName: "users",
    }

);

export default User;