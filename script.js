const questions = [

  {
    question: "Vilka av följande är operativsystem? (du kan välja fler)",
    type: "checkbox", 
    answers: [
      { text: "Windows", correct: true },
      { text: "Linux", correct: true },
      { text: "Chrome", correct: false },
      { text: "iOS", correct: true },
    ],
  },

  {
    question: "HTML är ett programmeringsspråk.",
    type: "trueFalse",
    answers: [
      { text: "Sant", correct: false },
      { text: "Falskt", correct: true },
    ],
  },
  {
    question: "Git används för versionshantering av kod.",
    type: "trueFalse",
    answers: [
      { text: "Sant", correct: true },
      { text: "Falskt", correct: false },
    ],
  },
  {
    question: "Vilket företag utvecklade JavaScript?",
    type: "multipleChoice",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Oracle", correct: false},
      { text: "Google", correct: false },
      { text: "Netscape", correct: true },
    ],
  },
  {
    question: "Vad är DOM i JavaScript?",
    type: "multipleChoice",
    answers: [
      { text: "Data Output Management", correct: false },
      { text: "Document Object Model", correct: true },
      { text: "Digital Object Model", correct: false },
      { text: "Dynamic Output Method", correct: false },
    ],
  },

  {
    question: "Vilket av följande är ett programmeringsspråk?",
    type: "multipleChoice",
    answers: [
      { text: "brailleScript", correct: false },
      { text: "JavaScript", correct: true },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
    ],
  },

  {
    question: "Vilken funktion används för att skriva ut text i JavaScript?",
    type: "multipleChoice",
    answers: [
      { text: "print", correct: false },
      { text: "write", correct: false },
      { text: "console.log", correct: true },
      { text: "output", correct: false },
    ],
  },
  {
    question: "CSS står för 'Central Style Sheet'.",
    type: "multipleChoice",
    answers: [
      { text: "Sant", correct: false },
      { text: "Falskt", correct: true },

    ],
  },
  {
    question: "Vad gör kommandot 'git pull?",
    type: "multipleChoice",
    answers: [
      { text: "Skickar ändringar till det lokala arkivet", correct: false },
      { text: "Skapar en ny gren", correct: false },
      { text: "Tar bort den nuvarande grenen", correct: false },
      { text: "Hämtar och integrerar ändringar från ett fjärrarkiv", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    type: "multipleChoice",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Afrika", correct: false },
    ],
  },


];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Store the question index and score

let currentQuestionIndex = 0; //Index will start from 0
let score = 0;

//When starting the quiz it will restart with 0
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  resetState(); // Lägg till resetState här för att återställa färgen på frågan
  showQuestion(); //set the scoe 0 and set the text next in the button
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {


    // if type === checkbox take answers and display with checkboxes


    //else 
    
    //take answers and display in button
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}



function resetState() {
  questionElement.style.color = ""; // Återställ färgen till standard
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
}

}

function selectAnswer(e) { // Here i want to  make the selectedCheckbox also count score if true 

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }   //Here i want for each checkbox if its true it adds classname correc
  Array.from(answerButtons.children).forEach((button) => { //for each button it check the dataset if its true it adds classname correct
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;

  let resultText = `Du klarade ${score} av ${totalQuestions} frågor! `;
  let resultClass = "";

  if (percentage < 50) {
    resultText += "Underkänt :( !";
    resultClass = "red";
  } else if (percentage >= 50 && percentage <= 75) {
    resultText += "Bra :)";
    resultClass = "orange";
  } else {
    resultText += "Riktigt bra jobbat :D";
    resultClass = "green";
  }

  questionElement.innerHTML = resultText;
  questionElement.style.color = resultClass;
  questionElement.classList.add(resultClass);

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}




function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
