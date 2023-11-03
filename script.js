const questions = [
    {
        question: "Which is largest animal in the world ?",
        answers: [
            { text: "shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "GIraffe", correct: false },
        ]
    },
    {
        question: "How many days in a week ?",
        answers: [
            { text: "7", correct: true },
            { text: "5", correct: false },
            { text: "8", correct: false },
            { text: "9", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world? ?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Arctic", correct: false },
            { text: "Australia", correct: true },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "TajMahal located in?",
        answers: [
            { text: "Bangladesh", correct: false },
            { text: "Srilanka", correct: false },
            { text: "Nepal", correct: false },
            { text: "India", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else selectBtn.classList.add("incorrect");

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();




