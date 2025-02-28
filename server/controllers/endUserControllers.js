//this is for test-taking functionality (start test, submit answers).

import { Question } from "../models/questionSchema.models.js";
import { Result } from '../models/resultSchema.models.js';

//Fetch Questions (For End Users)
export const getQuestions = async (req, res) => {

    try {
        const questions = await Question.find().select("-correctOptionIndex"); //fetching all the questions and excluding the correct option index

            // // "-" means exclude this field
            // Without "-" would include only that field

            // Without select():
            // {
            //     question: "What is 2+2?",
            //     options: ["3", "4", "5", "6"],
            //     correctOptionIndex: 1  // Reveals answer!
            // }

            // With select("-correctOptionIndex"):
            // {
            //     question: "What is 2+2?",
            //     options: ["3", "4", "5", "6"]
            //     // correctOptionIndex is excluded
            // }

        res.status(200).json({ message: "Questions fetched successfully", questions });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//Submit Test (For End Users)

export const submitTest = async (req, res) => {

    try {
        const {answers} = req.body; //destructuring answers from req.body
        let score = 0;

        for(const answer of answers){
            const question = await Question.findById(answer.questionId); //fetching the question by id

            if(question && question.correctOptionIndex === answer.selectedOptionIndex){
                score++;
            }

            const result = new result ({
                user : req.user._id,
                score,
            });

            await Result.save();
            res.status(200).json({ message: "Test submitted successfully", score });
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
    

};

