const questionNumber = document.querySelector(",question-number");
const questionText =  document.querySelector(",question-text");
const optionContainer =  document.querySelector("option-container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
//push the question into availableQuestion Array
function setAvailableQuestion(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        console.log([i])
    }

}

window.onload = function(){

    setAvailableQuestion();

}