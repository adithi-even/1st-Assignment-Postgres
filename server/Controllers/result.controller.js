import Result from '../models/result.model.js';
import Assessment from '../models/assessment.model.js';
import ResultAnswer from '../models/resultAnswer.js';
import User from '../models/user.model.js';
import Question from '../models/question.model.js';
import Option from '../models/option.model.js';

export const submitResult = async (req, res) => {
    try {
       const {assessmentId, userId, answers, score} = req.body;

       //validate assessment & user existance
        const assessment = await Assessment.findByPk(assessmentId);
        if(!assessment){
            return res.status(404).json({message: "Assessment not found"});
        }

        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        //create result

        const result = await Result.create({assessmentId, userId, score});

        //create result asnwers

        if(answers && answers.length > 0){
            const formatedAnswers = answers.map(ans => ({
                resultId: result.id,    
                questionId: ans.questionId,
                selectedOptionIndex: ans.selectedOptionIndex,
                isCorrect: ans.isCorrect,
            }));
            await ResultAnswer.bulkCreate(formatedAnswers);
        }

        res.status(201).json({message:"Result submitted Successfully", result});    
                
    } catch (error) {
        console.log("Error submitting result", error);
        
        return res.status(500).json({ message: error.message });
        
    }
};
//get specific result by resultId
export const getResultById = async (req, res) => {
    try {
        const { resultId } = req.params;

        console.log("Params received:", req.params);


        const result = await Result.findByPk(resultId, {
            include: [
                {
                    model: Assessment, 
                    attributes: ['id', 'title']
                },
                {
                    model:User,
                    attributes:['id','username','email']
                },
                {
                    model: ResultAnswer,
                    include:[
                        {
                            model:Question,
                            attributes:['question','correctoptionIndex'],
                            include:[
                                {
                                    model: Option,
                                    attributes:['id', 'text', 'isCorrect']
                                }
                            ]
                        }
                    ],
                }
            ]
        });

        if(!result)return res.status(404).json({message:"Result not found"});
        res.status(200).json({result});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

export const getUserResults = async (req, res) => {
    try {
        const { userId } = req.params;
        //validate User
        const user = await User.findByPk(userId);
        if(!user)return res.status(401).json({message:"user not found"});

        const results = await Result.findAll({
            where:{ userId },
            include: [
                {
                    model:Assessment, 
                    attributes: ['id', 'title'] 
                },  //include assessment details
            ],
        });

        res.status(200).json(results);
    } catch (error) {
        console.error("Error getting user results", error);
        res.status(500).json({message:"internal server error "});
    }
};

export const getAssessmentResults = async (req, res) => {
    try {
        const { assessmentId } = req.params;

        // Find all results related to the assessment
        const results = await Result.findAll({
            where: { assessmentId },
            include: [
                {
                    model: User,
                    attributes: ["id", "username", "email"], // Include user info
                },
                {
                    model: ResultAnswer,
                    include: [
                        {
                            model: Question,
                            attributes: ["id", "question", "correctoptionIndex"], // Include question details
                        },
                    ],
                },
            ],
        });

        if (!results.length) {
            return res.status(404).json({ message: "No results found for this assessment." });
        }

        res.json({ assessmentId, results });
    } catch (error) {
        console.error("Error fetching assessment results:", error);
        res.status(500).json({ message: "Error fetching assessment results", error: error.message });
    }
};
