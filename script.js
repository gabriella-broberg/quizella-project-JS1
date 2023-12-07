const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false},
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which are countries?",
    answers: [
      { text: "Brazil", correct: true },
      { text: "Australia", correct: true },
      { text: "pear", correct: false },
      { text: "bike", correct: false },
    ],
  },

  {
    question: "Which are Animals?",
    answers: [
      { text: "Kiwi", correct: false },
      { text: "Horse", correct: true },
      { text: "Dog", correct: true },
      { text: "bike", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerCheckboxes = document.getElementById("answer-checkboxes");
const nextButton = document.getElementById("next-btn");

//Store the question index and score

let currentQuestionIndex = 0; //Index will start from 0
let score = 0;

//When starting the quiz it will restart with 0
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion(); //set the scoe 0 and set the text next in the button
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const container = document.createElement("div");
    container.classList.add("answer-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = answer.text;
    checkbox.name = "answers";
    checkbox.value = answer.text;
    checkbox.dataset.answer = answer.value; // Assuming there is an 'value' property in your answer object
    checkbox.classList.add("checkbox");

    const answerText = document.createElement("span");
    answerText.innerHTML = answer.text;

    container.appendChild(checkbox);
    container.appendChild(answerText);
    answerCheckboxes.appendChild(container);

    if (answer.correct) {
      checkbox.dataset.correct = answer.correct;
    }

    checkbox.addEventListener("change", selectAnswer);
  });
}


function resetState() {
  nextButton.style.display = "none";
  questionElement.style.color = ""; // Reset text color

  while (answerCheckboxes.firstChild) {
    answerCheckboxes.removeChild(answerCheckboxes.firstChild);
  }
}

/*function selectAnswer(e) {
  const selectedCheckbox = e.target;
  const isCorrect = selectedCheckbox.dataset.correct === "true";

  if (selectedCheckbox.checked) {
    if (isCorrect) {
      selectedCheckbox.classList.add("correct");
      score++;
    } else {
      selectedCheckbox.classList.add("incorrect");
    }
  } else {
    selectedCheckbox.classList.remove("correct", "incorrect");
  }



  Array.from(answerCheckboxes.querySelectorAll('.checkbox')).forEach((checkbox) => {
    //checkbox.disabled = true;
  });

  nextButton.style.display = "block";
} */



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

// here we need to add the right answers 

  questionElement.innerHTML = resultText;
  questionElement.style.color = resultClass;
  questionElement.classList.add(resultClass);

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

let selectedAnswers = [];

function selectAnswer(e) {
  const selectedCheckbox = e.target;

  if (selectedCheckbox.checked) {
    selectedCheckbox.classList.add("selected");
    selectedAnswers.push(selectedCheckbox.value);
  } else {
    selectedCheckbox.classList.remove("selected");
    selectedAnswers = selectedAnswers.filter(value => value !== selectedCheckbox.value);
  }

  nextButton.style.display = "block";
}

function handleNextButton() {
  // Check correctness only when the user clicks "Next"
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswers = currentQuestion.answers
    .filter(answer => answer.correct)
    .map(answer => answer.text);

  const allCorrectSelected = selectedAnswers.length === correctAnswers.length &&
    selectedAnswers.every(value => correctAnswers.includes(value));

  if (allCorrectSelected) {
    score++;
  }
  console.log(score); // Log the score after each question

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }

  // Reset selected answers for the next question
  selectedAnswers = [];
}



nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
