import Assessment from "../models/assessment.model.js";
import Question from "../models/question.model.js";
import AssessmentQuestion from "../models/assessmentQuestions.model.js";
import Option from "../models/option.model.js";

export const createAssessment = async (req, res) => {
    try{
        const {title, createdBy, questions: questionIds} = req.body;
        console.log("req.body.questionIds:", req.body.questions);

        const existing = await Assessment.findOne({ where: { title, createdBy } });
        if (existing) {
            return res.status(400).json({ message: "Assessment already exists. Try with the different title or different creator " });
        }

        const newAssessment = await Assessment.create({
            title,
            createdBy
        });
        console.log("newAssessment.id:", newAssessment.id);        
        

            if (questionIds && questionIds.length > 0) {
                console.log("Inside the if block - questionIds:", questionIds);
                const questionMappings = questionIds.map(questionId => ({
                assessmentId: newAssessment.id,
                questionId,
            }));

             console.log("question Mapping", questionMappings);

             console.log("Attempting to create AssessmentQuestion before:");
             await AssessmentQuestion.bulkCreate(questionMappings);
             console.log("Attempting to create AssessmentQuestion after:");
             
        }else {
            console.log("questionIds is either null/undefined or empty:", questionIds); // Log if the if condition fails
        }

            res.status(201).json({ message: "Assessment created", assessment: newAssessment });
    
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getAssessmentById = async (req, res) => {
    try {
        console.log('getAssessmentById called with ID:', req.params.id);
        const assessment = await Assessment.findByPk(req.params.id, {
            include:[
                {
                    model: Question,
                    as: 'Questions',
                    include: [
                        {
                            model: Option,
                            as: "options"
                        }
                    ]
                   
                }
            ],
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
            include: [
                {
                    model: Question,
                    as: 'Questions'
                }
            ],
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
        console.log(assessmentId,"delete assessment id");
        
        const assessment = await Assessment.findByPk(assessmentId);
        console.log(assessment,"delete assessment ");
        
        if(!assessment)return res.status(404).json({error: "Assessment not found"});
        await assessment.destroy();
        res.status(200).json({message:"Successfully deleted Assessment "});

    } catch (error) {
        res.status(500).json({message: "Couldn't delete assessment", error: error.message});
    }

}


//END USER CONTROLLER 

export const getAssessmentsForEndUser = async(req, res) => {
        console.log("getAvailableAssessmentsForEndUser called!");

    try {

        const asessmentsForEndUser = await Assessment.findAll({
            include:[
                {
                    model: Question,
                    as: 'Questions'
                }
            ],

        });
        console.log("Assessments fetched:", asessmentsForEndUser);

        res.json(asessmentsForEndUser)

    } catch (error) {
        res.status(500).json({message:"Error loading the Assessments for end-user ", error: error.message})   
    }
}

export const startAssessment = async (req, res) => {
    try {
        const assessmentId = req.params.id ;

        const assessment = await Assessment.findByPk(assessmentId, {
            include: [
                {
                    model: Question,
                    as: 'Questions',
                    include: [
                        { 
                            model: Option, as: 'options' 
                        }
                    ]
                }
            ]
        });

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found." });
        }

        res.status(200).json({ assessment });

    } catch (error) {
        console.error("Error starting assessment:", error);
        res.status(500).json({ message: "Failed to start assessment." });
    }
};


// testing
// const allQuestions = await Question.findAll({
//   include: [{ model: Option, as: "options" }]
// });

// console.log(JSON.stringify(allQuestions, null, 2));
