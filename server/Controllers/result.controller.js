import Result from '../models/result.models';
import ResultAnswer from '../models/resultAnswer.models';

export const submitResult = async (req, res) => {
    try {
        const {assessmentId, userId, answers} = req.body;

        if(!answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ message: 'Answers array is required' });
        }

        const newResult = await Result.create({assessmentId, userId});

        const answerData = await Promise.all(answers.map(async (answer) => {
            const {questionId, selectedOptionId} = answer;
            
            const correctOption = await Option.findOne({
                where: {questionId, isCorrect: true}
            });

            if(!correctOption){
                return res.status(400).json({error:`No correct option found for question ${questionId}`});
            }

            const isCorrect = correctOption.id === selectedOptionId;

            return {resultId: newResult.id, questionId, selectedOptionId, isCorrect};
        }

        
    ));
    await ResultAnswer.bulkCreate(answerData); //storeing all the answers

    const savedResult  = await Result.findByPk(newResult.id, {
        include: [{
            model: ResultAnswer,
            include: [Question, Option]
        }] //fetching the result with the answers
    });

    res.status(201).json(savedResult);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
};

export const getResultById = async (req, res) => {
    try {
        const result = await Result.findByPk(req.params.id, {
            include: [Answer]
        });

        if(!result){
            return res.status(404).json({message: 'Result not found'});
        }
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};