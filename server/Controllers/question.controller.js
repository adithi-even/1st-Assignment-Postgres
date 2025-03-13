import Question from "../models/question.model";
import Option from "../models/option.model";

export const createQuestion = async (req, res) => {
    try {
        const {question, correctOptionIndex, options} = req.body;

        if(!options || options.length < 4){
            return res.status(400).json({ message: "Options are required and must be at least 4" });
        }

        const newQuestion = await Question.create({ question, correctOptionIndex });

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