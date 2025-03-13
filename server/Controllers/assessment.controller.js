import Assessment from "../models/assessment.model";
import Question from "../models/question.model";
import AssessmentQuestion from "../models/assessmentQuestions.model";

export const createAssessment = async (req, res) => {
    try{
        const {title, createdBy, questionIds} = req.body;
        const newAssessment = await Assessment.create({
            title,
            createdBy,
        });

    
        if (questionIds && questionIds.length > 0) {
            const questionMappings = questionIds.map(questionId => ({
                assessmentId: newAssessment.id,
                questionId,
            }));
            await AssessmentQuestion.bulkCreate(questionMappings);
        }
        res.status(201).json(newAssessment);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findByPk(req.params.id, {
            include:[Question],
        });

        if(!assessment) {
            return res.status(404).json({message: "Assessment not found"});
        }

        res.json(assessment);


    } catch (error) {
        res.status(500).json({message: error.message});
    }

};