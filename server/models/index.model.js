import sequelize from '../config/sequelize.js';
import User from './user.model.js';
import Assessment from './assessment.model.js';
import Question from './question.model.js';
import Option from './option.model.js';
import Result from './result.model.js';
import ResultAnswer from './resultAnswer.js';
import AssessmentQuestion from './assessmentQuestions.model.js';
 
User.hasMany(Assessment, {
    foreignKey: 'createdBy'
});
Assessment.belongsTo(User, {
    foreignKey: 'createdBy'
});
 
Assessment.belongsToMany(Question, {
    through: AssessmentQuestion,
    foreignKey: 'assessmentId',
    as: "Questions"
});

Question.belongsToMany(Assessment, {
    through: AssessmentQuestion,
    foreignKey: 'questionId',
    as: "Assessments"

});
 
Question.hasMany(Option, {
    foreignKey: 'questionId',
    onDelete: 'CASCADE'
});
Option.belongsTo(Question, {
    foreignKey: 'questionId'
});
 
User.hasMany(Result, {
    foreignKey: 'userId'
});

Result.belongsTo(User, {
    foreignKey: 'userId'
});



Result.belongsTo(Assessment, {
    foreignKey: 'assessmentId'
});

Assessment.hasMany(Result, {
    foreignKey: 'assessmentId'
});

Result.hasMany(ResultAnswer, {
   foreignKey: 'resultId', 
   onDelete: 'CASCADE'
});


ResultAnswer.belongsTo(Result, {
    foreignKey: 'resultId'
});

ResultAnswer.belongsTo(Question, {
    foreignKey: 'questionId'
});

 
export { sequelize, User, Assessment, Question, Option, Result, ResultAnswer, AssessmentQuestion };