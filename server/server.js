import express from 'express';
import { sequelize } from 'sequelize';


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

sequelize.sync()
.then(()=>{
    console.log("Database connected successfully");
    
});


//Server start

const PORT = dotenvConfig.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
});