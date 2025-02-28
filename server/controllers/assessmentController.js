import { Assessment } from "../models/assessmentSchema.models.js";
// if there is an export default then import would be: Assessment
// if there is an export const somethong then import would be: {Assessment}

// Create a new assessment(usede by onlu cc)
export const createAssessment = async(req, res) =>{

    console.log("received request body", req.body);
    
    const{title, questions, createdBy} = req.body;

    if(!title || !questions || !Array.isArray(questions) || !createdBy){
        return res.status(400).json({message: 'Please enter all fields'});
    }

    try {
        const newAssessment = await Assessment.create({
            title,
            questions,
            createdBy
        });
        res.status(201).json({message: 'Assessment created successfully', assessment : newAssessment});
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
};

//get all assessments(Used by both Content Creator and End User)
export const getAssessments = async(req, res) => {
    try {
        const assessments = await Assessment.find().populate('questions').populate('createdBy'); //.populate() replaces reference IDs with actual document data from referenced collections.
        res.status(200).json({message: 'Assessments fetched successfully', assessments});
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }

};


// Start an assessment (Used by End User)

export const startAssessment = async(req, res) => {
    const{ id } = req.params;   //id is the assessment id
    try {
        const assessment = await Assessment.findById(id).populate('questions');  //populate() replaces reference IDs with actual document data from referenced collections.
        if(!assessment){
            return res.status(404).json({message: 'Assessment not found'});
        }

        res.status(200).json({message: 'Assessment fetched successfully', assessment});
    } catch (error) {
        res.status(500).json({message:"Assessment not found", error});
    }
};