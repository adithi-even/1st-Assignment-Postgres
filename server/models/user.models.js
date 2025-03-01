import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const User = sequelize.define(
    "User",
    {
        username:{
            type: DataTypes.STRING,
            allowNull:false,
            
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            
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
            allowNull:false,

        }

    },
    {
        timestamps: true
    }

);

export default User;