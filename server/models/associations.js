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