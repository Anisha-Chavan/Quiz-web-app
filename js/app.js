const questionNumber = document.querySelector(".question-number");
const questionText =  document.querySelector(".question-text");
const optionContainer =  document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
var sec = 20;
var time = setInterval(myTimer, 1000);


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
//push the question into availableQuestion Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        availableQuestions.push(quiz[i])
    }
}
//set question number and question and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " +  quiz.length;

    console.log(questionNumber)
    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    currentQuestion =  questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get the position of 'questionindex' from the availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the questionindex from availableQuestion Array,so that question does not repeat
    availableQuestions.splice(index1,1);
    //console.log(questionIndex);
    //console.log(availableQuestions)
    //set options
    //get length of options
    const optionLen = currentQuestion.options.length
    //push option into availableOptions Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)

    }
    let animationDelay = 0.15;
    
    optionContainer.innerHTML='';
    //ceate options in html
    for(let i=0;i<optionLen;i++){
    
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id=i;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter+=1;
}
// get result of current attempt question
function getResult(eLement){
    const id = parseInt(eLement.id);
    //get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        //set the green color to correct option
        eLement.classList.add("correct");
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        
    }
    else{
        //set the red color to wrong option
        eLement.classList.add("wrong");
         //add the indicator to wrong mark
        updateAnswerIndicator("wrong");
        //if answer is wrong the show correct option by adding green colour the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}


//make all the options unclickable once the user select a option(restrict the user to change the option again)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}
function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);

 }
function next(){
    if(questionCounter === quiz.length){
        quizOver();
    } else{
        clearInterval(time);
        sec = 20;
        time =  setInterval(myTimer, 1000);
        getNewQuestion();
    }
}
function quizOver(){
    //hide quiz quizbox
    quizBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
    quizResult();
}
//get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;

}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;

}
function tryAgainQuiz(){
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quixBox
    quizBox.classList.remove("hide")
    resetQuiz();
    startQuiz();
}
function goToHome(){
    //hide result box
    resultBox.classList.add("hide");
    //show home box
    homeBox.classList.remove("hide");
    resetQuiz();

}

function myTimer() {
    document.getElementById('timer').innerHTML = sec + " sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
        next();
    }
}
//#### STARTING POINT ####

function startQuiz(){
    //hide home box
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    
    // second we will call getnewQuestion(); function
    getNewQuestion();
    //to create indicator of answer
    answersIndicator();
}




