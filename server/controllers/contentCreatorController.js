// this is for question management (create, update, delete questions).

import { Question } from "../models/questionSchema.models.js";

//create question (only for cc)

export const createQuestion = async (req, res) => {
    if (req.user.role !== 'content_creator') {
        return res.status(401).json({ message: "Access DEnied" });
    }

    try {
        const { question, options, correctOptionIndex } = req.body;

        const newQuestion = new Question({
            question,
            options,
            correctOptionIndex,
            createdBy: req.user._id
        });

        await newQuestion.save();
        res.status(201).json({message: "Question added successfully "},newQuestion);


          // Example of difference:
          console.log(newQuestion._id);    // ObjectId("507f1f77bcf86cd799439011")
          console.log(newQuestion.id);     // "507f1f77bcf86cd799439011"


    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateQuestion = async (req, res) => {

    if(req.user.role !== 'content_creator'){
        return res.status(401).json({message: "Access Denied"});
    }

    try {

        const question = await Question.findById(req.params.id);

        if(!question){
            return res.status(404).json({message: "Question not found"});
        }

        Object.assign(question, req.body); //here we are assigning the new data(i.e., req.body) to the question (i.e.,question , the old data(which is the 1st argument of the Object.assign method))
        await question.save();  // Save updated document to database

        res.status(200).json({message: "Question updated successfully"}, question);
        
    } catch (error) {
        res.status(500).json({message: "Server error", error});
        
    }
};

export const deleteQuestion = async (req, res) => {

    if(req.user.role !== 'content_creator'){
        return res.status(401).json({message: "Access Denied"});
    }

    try {
        // const question = await Question.findById(req.params.id);

        // if(!question){
        //     return res.status(404).json({message: "Question not found"});
        // }

        // await question.remove();
        // res.status(200).json({message: "Question deleted successfully"});



        //all commented 
        // or 

        await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Question deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message: "Server error", error});
        
    }
};