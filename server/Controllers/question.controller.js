import Question from "../models/question.model.js";
import Option from "../models/option.model.js";

export const createQuestion = async (req, res) => {
    try {
        const {question, correctoptionIndex, options} = req.body;

        if(!options || options.length < 4){
            return res.status(400).json({ message: "Options are required and must be at least 4" });
        }

        const newQuestion = await Question.create({ question, options, correctoptionIndex });

        console.log("Newly created question:", newQuestion);
        console.log("Newly created question ID:", newQuestion.id);        

        if(options && options.length > 0){
          const optionData  = options.map((text, index) => ({
            text,
            questionId: newQuestion.id,
            isCorrect: index === correctoptionIndex
          }));
          await Option.bulkCreate(optionData);
        }

        const createdQuestion = await Question.findByPk(newQuestion.id, {
            include: [{
                model: Option,
                as:'options',
            }]
        });

        console.log("createdQuestion....", createQuestion);
        
        res.status(201).json({ message: "Question created successfully", createdQuestion });
        
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id, {
            include: [
                {
                    model: Option,
                    as : 'options',
                    attributes: ['text', 'isCorrect', 'id'],
                },
            ]
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
            include:[
                {
                    model: Option,
                    as: 'options',
                    attributes: ['text', 'isCorrect', 'id'], // or include 'id' if needed
                },
            ]
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
            return res.status(404).json({message:"no questions found to delete "});
        }

        //removing the associations before deleting 
        await AssessmentQuestion.destroy({where: { questionId: id }}); //temprorality commented for testing
        await Option.destroy({where:  { questionId: id }});

        //delete the question
        await findQuestion.destroy() ;

        res.status(200).json({message:"Question deleted Successfully"});

    } catch (error) {
        console.error("Delete question error:", error); 
        return res.status(500).json({ message: "Couldn't delete the question", error: error.message });
    }
    
};

export const updateQuestion = async (req, res ) => {
    try {
        const { id } = req.params;
        const { question, options, correctoptionIndex} = req.body;
        
        const exisitingQuestion = await Question.findByPk(id);
        if(!exisitingQuestion){
            return res.status(500).json({message:"Question not found "});
        }

        //update question text and correct option index

        await exisitingQuestion.update({question, correctoptionIndex}) ;

        if(options && options.length > 0){
            //delete existing options
            await Option.destroy({where: {questionId: id}}) ;

            //Add new Options

            const optionData = options.map((text, index) => ({
                text,
                questionId: id,
                isCorrect: index === correctoptionIndex

            }));
            await Option.bulkCreate(optionData);
        }

        const updatedQuestion = await Question.findByPk(id, {
            include:[
                {
                    model: Option,
                    as: 'options',
                    attributes: ['text', 'isCorrect', 'id'], // or include 'id' if needed
                },
            ]
        });

        res.status(200).json({message:"Questions updated successfullly ", updatedQuestion});

    } catch (error) {
        res.status(501).json({message: "Couldn't update the question"});
        throw error;
    }
};