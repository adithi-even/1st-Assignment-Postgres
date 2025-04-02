import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenvConfig from "./config/dotenv.js";
import sequelize from "./config/sequelize.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import assessmentRoutes from "./routes/assessments.routes.js";
import questionRoutes from "./routes/questions.routes.js";
import resultRoutes from "./routes/results.routes.js";

//initializes express app 

const app = express();
//Middelware

app.use(cors());
app.use(helmet());
app.use(express.json());

//Routes

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/question', questionRoutes);
// app.use('/api/option', optionRoutes);
// app.use('/api/answer', answerRoutes);   
app.use('/api/result', resultRoutes);

//database
Sequelize.sync()
.then(()=>{
    console.log("Database connected successfully");
    
});


//Server start

const PORT = dotenvConfig.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
});