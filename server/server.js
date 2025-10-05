import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenvConfig from "./config/dotenv.js";
import sequelize from "./config/sequelize.js";
import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/users.routes.js";
import assessmentRoutes from "./Routes/assessments.routes.js";
import questionRoutes from "./Routes/questions.routes.js";
import resultRoutes from "./Routes/results.routes.js";
import dashboardRoutes from "./Routes/dashboard.routes.js";
import './models/index.model.js';

//initializes express app 

const app = express();

//Middleware

app.use(cors({
origin: ['http://localhost:5173', 'http://127.0.0.1:5174'],
  credentials: true
}));

app.use(helmet());
app.use(express.json());

//Routes

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/question', questionRoutes);
 
app.use('/api/result', resultRoutes);
app.use('/api/dashboard', dashboardRoutes); 

//database

sequelize.sync()
.then(()=>{
    console.log("Database connected successfully");
    
    //Server start
    
    const PORT = dotenvConfig.PORT;
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("Unable to connect to database: " , err); 
});
