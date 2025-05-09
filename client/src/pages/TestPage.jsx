//END USER PAGE
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const TestPage=() => {
    const {assessmentId} = useParams(); //since we are using the react router dom we are using the url for fetching assessment id
    const [assessment, setAssessment] = useState(null);
    const [answers, setAnswers] = useState({});
    // const [EditingQuestionId, setEditingQuestionId] = useState(null);
    // const [editedQuestion,setEditedQuestion] = useState({})
    const Navigate = useNavigate();

    const fetchAssessment = async () => {

        try {
            console.log("Fetching assessmentId...",assessmentId);
            
            const response = await axios.post(`/api/assessments/${assessmentId}/start`);
            setAssessment(response.data.assessment);
        } catch (error) {
            console.error('Error fetching the answers', Error);
            
        }
    };

    useEffect(()=>{
        fetchAssessment();
    },[assessmentId]);


    const handleAnswerChange = (questionId, optionIndex) => {
        setAnswers({...answers, [questionId] : optionIndex });
    };

    // const handleEditClick = (question) => {
    //     setEditingQuestionId(question._id);
    //     setEditedQuestion({...question})
    // } 
    
    // const handleQuestionChange = (question) => {
        
    // } 

    // const handleOptionChange = (question) => {
        
    // } 
    
    // const saveEditedQuestion = (question) => {
        
    // } 
    
    // const deleteQuestion = (question) => {
        
    // } 
    
    const handleSubmit = async () => {

        const unansweredQuestions = assessment.questions.filter(
            (question) => !(question._id in answers)
        );

        if(unansweredQuestions.length > 0){
            alert(`Please answer all questions before submitting!`);
            return;
        }


        try {
            const response = await axios.post(`/api/results/${assessmentId}/submit`, {
                userAnswers: answers
            });
    
            if (response.status === 200) {
                console.log("Test Submitted Successfully:", response.data);
                // alert(`Test submitted! Correct: ${response.data.results.correct}, Incorrect: ${response.data.results.incorrect}`);

                Navigate(`/results/${response.data.resultId}`);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error submitting test:", error);
        }
    };
    if(!assessment) return <div>Loading assessment...</div>;



  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">{assessment.title}</h1>

        {assessment.questions.map((question, index) => (
            <div key={question._id} className='mb-6'>
                <p>{index + 1}. { assessment.questions[index].question}</p>

                {question.options.map((option, idx) => (
                    <div key={idx} className='flex items-center'>
                        <input
                         type="radio"
                         name={question._id}
                         value={idx}
                         onChange={() => handleAnswerChange(question._id, idx)}
                         checked={answers[question._id] === idx}
                         className='mr-2'
                         />
                        <label >{option}</label>
                    </div>
                ))}
            </div>
        ))}
        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded"  onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TestPage;



