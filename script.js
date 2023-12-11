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
    question: "Vad gör funktionen 'map' i JavaScript?",
    type: "multipleChoice",
    answers: [
      { text: "Lägger till ett nytt element i en array", correct: false },
      { text: "Tar bort ett element från en array", correct: false },
      { text: "Itererar över varje element i en array och tillämpar en funktion", correct: true },
      { text: "Sorterar elementen i en array i stigande ordning", correct: false },
    ],
  }
  


];

const questionElement = document.getElementById("question");
const answerCheckboxes = document.getElementById("answer-checkboxes");
const nextButton = document.getElementById("next-btn");




//Store the question index and score

let currentQuestionIndex = 0; //Index will start from 0
let score = 0;

let selectedAnswers = [];
let userResponses = [];

//When starting the quiz it will restart with 0
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers = []; // Reset selected answers
  userResponses = []; // Reset user responses
  nextButton.innerHTML = "Next";

  // Clear the content of the feedback-container
  const feedbackContainer = document.getElementById("feedback-container");
  feedbackContainer.innerHTML = "";
  // Hide the feedback container initially
  document.getElementById("feedback-container").style.display = "none";


  showQuestion();
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




function showScore() {
  resetState();
  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;

  let resultText = `Du fick ${score} rätt av ${totalQuestions}!`;
  let resultClass = "";


    // Determine result class based on the percentage
    if (percentage < 50) {
      resultText += "<br>Underkänt :( !";
      resultClass = "red";
    } else if (percentage >= 50 && percentage <= 75) {
      resultText += "<br>Bra :)";
      resultClass = "orange";
    } else {
      resultText += "<br>Riktigt bra jobbat :D";
      resultClass = "green";
    }

  // Show the feedback container
  document.getElementById("feedback-container").style.display = "block";

  const resultContainer = document.createElement('div');
  resultContainer.classList.add('result-container');

  // Display correct/incorrect information for each question
  userResponses.forEach((response, index) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    resultItem.innerHTML = `<br>${index + 1}: <span style="color: ${response.correct ? 'green' : 'red'}">${response.correct ? 'Rätt' : 'Fel'}</span>`;


    // Display the selected answers
    if (response.userSelections.length > 0) {
      resultItem.innerHTML += `<br>Du svarade: ${response.userSelections.join(', ')}`;
    }

    // Display the correct answers
    resultItem.innerHTML += `<br>Korrekt: ${questions[index].answers
      .filter(answer => answer.correct)
      .map(answer => answer.text)
      .join(', ')}`;

    resultContainer.appendChild(resultItem);
  });

  document.getElementById("feedback-container").appendChild(resultContainer);





  document.getElementById("question").innerHTML = resultText;
  document.getElementById("question").style.color = resultClass;
  document.getElementById("question").classList.add(resultClass);

  nextButton.innerHTML = "Spela igen!";
  nextButton.style.display = "block";
}




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


  userResponses.push({ 
    question: currentQuestion.question,
    userSelections: selectedAnswers,
    correct: allCorrectSelected,
  });

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

const toggleModeBtn = document.getElementById("toggle-mode-btn");
const body = document.body;

toggleModeBtn.addEventListener("click", toggleMode);

function toggleMode() {
  body.classList.toggle("light-mode");
}


