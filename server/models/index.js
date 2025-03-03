import Question from "./question.model";
import Option from "./option.model";


//defining the associations here

Question.hasMany(Option, {
    foreignKey: "questionId",
    as: "options",
    onDelete: "CASCADE",
});

Option.belongsTo(Question, {
    foreignKey: "questionId",
    as: "question",
}); 

//exporting the models
export { Question, Option };