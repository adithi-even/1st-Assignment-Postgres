import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

//importing route files

import questionRoutes from './routes/questionRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import userRoutes from './routes/userRoutes.js';
import endUserRoutes from './routes/endUserRoutes.js';
import contentCreatorRoutes from './routes/contentCreatorRoutes.js';

dotenv.config(); //loading .env variables

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


app.use(express.json());

app.use('/api/user', userRoutes);

app.use('/api/content-creators', contentCreatorRoutes);
app.use('/api/end-users', endUserRoutes);

app.use('/api/questions', questionRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/results', resultRoutes);



mongoose.connect(process.env.MONGODB_URI,{
    
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));



const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`server running on the port ${PORT}`));
