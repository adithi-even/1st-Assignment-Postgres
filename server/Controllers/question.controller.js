import Question from "../models/question.model.js";
import Option from "../models/option.model.js";

export const createQuestion = async (req, res) => {
    try {
        const {question, correctOptionIndex, options} = req.body;

        if(!options || options.length < 4){
            return res.status(400).json({ message: "Options are required and must be at least 4" });
        }

        const newQuestion = await Question.create({ question, correctOptionIndex });

        console.log("Newly created question:", newQuestion);
        console.log("Newly created question ID:", newQuestion.id);        

        if(options && options.length > 0){
          const optionData  = options.map((text, index) => ({
            text,
            questionId: newQuestion.id,
            isCorrect: index === correctOptionIndex
          }));
          await optionData.bulkCreate(optionData);
        }

        const createdQuestion = await Question.findByPk(newQuestion.id, {
            include: [Option]
        });

        console.log("createdQuestion....", createQuestion);
        
        res.status(201).json({ message: "Question created successfully" }, createdQuestion);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id, {
            include: [Option]
        });

        if(!question){
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getQuestions = async (req, res ) => {
    try {
        const questions = await Question.findAll({
            include:[Option]
        });

        if(!questions || questions.length === 0 ){
            res.status(502).json({message:"Questions did not found "})
        }
        
        res.status(200).json({message:"Questions fetched successfully " , questions});

    } catch (error) {
        res.status(501).json({message: "Couldn't find the question"});
        throw error;
    }
};

export const deleteQuestion = async (req, res ) => {
    try {
        const {id} = req.params;

        //find the question in the database
        const findQuestion = await Question.findByPk(id);

        if(!findQuestion){
            res.status(404).json({message:"no questions found to delete "});
        }

        //removing the associations before deleting 
        await AssessmentQuestion.destroy({where: { questionId: id }});
        await Option.destroy({where:  { questionId: id }});

        //delete the question
        await findQuestion.destroy() ;

        res.status(200).json({message:"Question deleted Successfully"});

    } catch (error) {
        res.status(404).json({message: "Couldn't delete the question"});
        throw error;
    }
};

export const updateQuestion = async (req, res ) => {
    try {
        const { id } = req.params;
        const { question, options, correctOptionIndex} = req.body;
        
        const exisitingQuestion = await Question.findByPk(id);
        if(!exisitingQuestion){
            return res.status(500).json({message:"Question not found "});
        }

        //update question text and correct option index

        await exisitingQuestion.update({question, correctOptionIndex}) ;

        if(options && options.length > 0){
            //delete existing options
            await Option.destroy({where: {questionId: id}}) ;

            //Add new Options

            const optionData = options.map((text, index) => ({
                text,
                questionId: id,
                isCorrect: index === correctOptionIndex

            }));
            await Option.bulkCreate(optionData);
        }

        const updatedQuestion = await Question.findByPk(id, {
            include:[Option]
        });

        res.status(200).json({message:"Questions updated successfullly ", updatedQuestion});

    } catch (error) {
        res.status(501).json({message: "Couldn't update the question"});
        throw error;
    }
};