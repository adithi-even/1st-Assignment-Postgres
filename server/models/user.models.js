import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

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
            allowNull:true,  //its better to mae it allowNull coz not all users are having refreshtoken in there local storage

        }

    },
    {
        timestamps: true,
        tableName: "users",
    }

);

export default User;