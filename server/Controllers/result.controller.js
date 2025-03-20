import Result from '../models/result.models';
import ResultAnswer from '../models/resultAnswer.models';
import Assessment from '../models/assessment.models';
import resultAnswer from '../models/answer.models';

export const submitResult = async (req, res) => {
    try {
       const {assessmentId, userId, answers, score} = req.body;

       //validate assessment & user existance
        const assessment = await Assessment.findByPk(assessmentId);
        if(!assessment){
            return res.status(404).json({message: "Assessment not found"});
        }

        const user = await user.findByPk(userId);
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
                selectedOptionidex: ans.selectedOptionIndex,
                isCorrect: ans.iscorrect,
            }));
            await resultAnswer.bulkCreate(formatedAnswers);
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
        const {id} = req.params;

        const result = await Result.findByPk(id, {
            include: [
                {
                    model: Assessment, 
                    attributes: ['id', 'title']
                },
                {
                    model:'User',
                    attributes:['id','username','email']
                },
                {
                    model: Answer,
                    include:[
                        {
                            model:Question,
                            attributes:['question','options','correctOptionIndex']
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

        const user = await user.findById(userId);
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


