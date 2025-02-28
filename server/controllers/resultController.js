import {Assessment} from '../models/assessmentSchema.models.js';
import { Result } from '../models/resultSchema.models.js';
 

// Submit answers and calculate results
export const submitAssessment = async (req, res) => {
    const { id } = req.params; //we are taking hte  id from teh url
    const { userAnswers, userId } = req.body;

    console.log("Received submission:",id, userAnswers);

    try {
        const assessment = await Assessment.findById(id).populate('questions');
       
        if (!assessment) {
            console.error("Assessment not found", id);
            
            return res.status(404).json({ message: 'Assessment not found' });
        }

        console.log("Assessment found", assessment);

        if(!assessment.questions || assessment.questions.length === 0){
            console.error("no questions found in htis assessment");
            return res.status(400).json({message:"Noquestions available in this assessment"})        }
        

        const results = { correct: 0, incorrect: 0 };

        let score = 0;
        let answers =[];



        console.log("Processing questions...");
        
        assessment.questions.forEach((question) => {

            if (!question) {
                console.error("Undefined question found in assessment", assessment._id);
                return;
            }


            console.log(`Checking Question: ${question._id}`);
            console.log(`Correct Answer: ${question.correctOption}`);
            console.log(`User Answer: ${userAnswers[question._id]}`);



            const userSelectedOption  = userAnswers[question._id];
            const isCorrect = userSelectedOption === question.correctOption ;

             if(isCorrect)
             {
                score++;
             }
             answers.push({
                questionId: question._id,
                selectedOptionIndex: userSelectedOption,
                isCorrect: isCorrect,
            });

            
            console.log("Finale Results:", score);
            
        });
        
        const newResult = new Result({
            assesmentId : id,
            // correct: results.correct,
            // incorrect:results.incorrect,
            userId: userId,
            score:score,
            answers: answers,
        });
        
        await newResult.save();

        

        

        console.log("Received submission:", req.params.id, req.body);
        console.log("Final Results:", results);


        return res.status(200).json({
            message: "Assessment submitted successfully",
            resultId: newResult._id,
            score: score,
        });

    } catch (error) {
        res.status(500).json({ message: 'Error submitting assessment', error });
    }
};

export const getResult = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Fetching result with ID:", id);

        // Try fetching using findById for resultId
        const result = await Result.findById(id)
            .populate('assesmentId', 'title') // Populate assessment title
            .populate('answers.questionId', 'question correctOption'); // Populate question details

        if (!result) {
            console.error("No result found for ID:", id);
            return res.status(404).json({ message: "Result not found" });
        }

        console.log("Fetched result from DB:", result);
        res.status(200).json({ result });

    } catch (error) {
        console.error("Error fetching result:", error); // Log exact error
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

