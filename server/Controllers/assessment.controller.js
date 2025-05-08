import Assessment from "../models/assessment.model.js";
import Question from "../models/question.model.js";
import AssessmentQuestion from "../models/assessmentQuestions.model.js";

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

export const getAssessmentById = async (req, res) => {
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

export const getAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.findAll({
            include: [Question],
        });

        res.json(assessments);

    } catch (error) {
        res.status(500).json({message:"error retrieving assessments"});
    }
};

export const updateAssessment = async(res, req) => {
    try {
        const {title, questionIds} = req.body;
        const assessmentId = req.params.id;

        const assessment = await Assessment.findByPk(assessmentId);

        if(!assessment)return res.status(200).json({message: "Assessment not found"});

        //update the assessment 
        
        await assessment.update({title});
         //updating questions if provided 

         if(questionIds) {
            await AssessmentQuestion.destroy({where: {assessmentId}});
            const questionMappings = questionIds.map(questionId => ({
                assessmentId,
                questionId,
            }));

            await AssessmentQuestion.bulkCreate(questionMappings);
         }

         res.json({message:"Assessment updated successfully"});
    } catch (error) {
        res.status(500).json({message: "Couldn't update assessment"});
    }
};

export const deleteAssessment = async (req, res) => {
    try {
        const assessmentId = req.params.id;

        const assessment = await Assessment.findById(assessmentId);

        if(!assessment)return res.status(404).json({error: "Assessment not found"});
        await assessment.destroy();
        res.status(200).json({message:"Successfully deleted Assessment "});

    } catch (error) {
        res.status(500).json({message: "Couldn't delete assessment", error: error.message});
    }

}