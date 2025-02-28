//this file connects to the Mongo DB 

import mongoose from 'mongoose';

const connectDB = async () => {
    try { 
        console.log('MONGODB_URI:', process.env.MONGODB_URI);
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,   //the previous code   useNewUrlParser: true,useUnifiedTopology: true are deprecated from the newest model of mongoDB 
            socketTimeoutMS: 30000,
            family: 4, // Use IPv4 
        });
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);

    }
}        
export default connectDB;   
