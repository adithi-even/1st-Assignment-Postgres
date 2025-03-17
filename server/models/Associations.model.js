import User from './user.models';
import Assessment from './assessment.models';
import Question from './question.models';
import Option from './option.models';
import Result from './result.models';
import ResultAnswer from './resultAnswer.models';
import AssessmentQuestion from './assessmentQuestion.models';
 
User.hasMany(Assessment, {foreignKey: 'createdBy'});
Assessment.belongsTo(User, {foreignKey: 'createdBy'});
 
Assessment.belongsToMany(Question, {through: AssessmentQuestion, foreignKey: 'assessmentId'});
Question.belongsToMany(Assessment, {through: AssessmentQuestion, foreignKey: 'questionId'});
 
Question.hasMany(Option, {foreignKey: 'questionId', onDelete: 'CASCADE'});
Option.belongsTo(Question, {foreignKey: 'questionId'});
 
User.hasMany(Result, {foreignKey: 'userId'});
Assessment.hasMany(Result, {foreignKey: 'assessmentId'});
 
Result.hasMany(ResultAnswer, {foreignKey: 'resultId', onDelete: 'CASCADE'});
ResultAnswer.belongsTo(Result, {foreignKey: 'resultId'});
 
export { User, Assessment, Question, Option, Result, ResultAnswer, AssessmentQuestion };