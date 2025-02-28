import { Question } from '../models/questionSchema.models.js'; //we are importing the 1st parameter from the ( export const Question = mongoose.model('Question', questionSchema);  ) in questionSchema.models.js

//creating questions with all the options 

export const createQuestion = async (req, res) => {

    const {options , question, correctOptionIndex} = req.body; //extracting the data from the request body

    if (!question ||  !options || correctOptionIndex === undefined || options.length !== 4) {
        return res.status(400).json({message:"Please fill all the fields correctly"});
    }

    try {
        const newQuestion = await Question.create({question, options, correctOptionIndex});  //creating a new question with the extracted data
        res.status(201).json({message:"Question created successfully", newQuestion}); //sending the success response
    } catch (error) {
        res.status(500).json({message:"Error retriving the questions" , Error: error.message}); //sending the error response
    }


};

export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find({});

        if(!questions || questions.length === 0){
            return res.status(404).json({ message: "No questions found" }); 
        }
        res.status(200).json({message:"Questions retrived Successfully" , questions })
    } catch (error) {
        res.status(500).json({message:"Error retrieving the questions",error});
    }
};



export const getQuestionById = async (req, res) => {
    try {
        const questionById = await Question.findById(req.params.id);
        if(!questionById){
           return res.status(500).json({message:"Question not found",error});
        }
        return res.status(200).json({message:"Question found Successfully" , questionById })
    } catch (error) {
        console.error("Error retrieving question by ID:", error);

        return res.status(500).json({message:"Error retrieving the questions",error:error.message});
        
    }

};
