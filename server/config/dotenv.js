import dotenv from 'dotenv';
dotenv.config();

export default{
    PORT: process.env.PORT || 5000,
    JWT_SECRET : process.env.JWT_SECRET,
    DATABASE_URL : process.env.DATABASE_URL,

    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT
    
}; //here we are using the default export to export the configuration object, which works as (when we are exporting something which is an object we can export it without giving any name and when we are importing we can give it any name and then we can use the imported object)
