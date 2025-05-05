import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,  //ex:localhost
        dialect: 'postgres',  //shows that we are using postgres
        port: process.env.DB_PORT,
        logging: false,  //disables logging  SQL query into the console 

});

export default sequelize;