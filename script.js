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
      { text: "Oracle", correct: false },
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
    question: "Vilka av följande är frontend-ramverk eller bibliotek?",
    type: "checkbox",
    answers: [
      { text: "React", correct: true },
      { text: "Express", correct: false },
      { text: "Django", correct: false },
      {
        text: "Vue",
        correct: true,
      },
    ],
  },
  {
    question: "Vad gör kommandot 'git pull?",
    type: "multipleChoice",
    answers: [
      { text: "Skickar ändringar till det lokala arkivet", correct: false },
      { text: "Skapar en ny gren", correct: false },
      { text: "Tar bort den nuvarande grenen", correct: false },
      {
        text: "Hämtar och integrerar ändringar från ett fjärrarkiv",
        correct: true,
      },
    ],
  },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const answerCheckbox = document.getElementById("answerCheckbox");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  resetState();
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  answerCheckbox.innerHTML = '';

  if (currentQuestion.type === "checkbox") {
    currentQuestion.answers.forEach((answer) => {
      const checkboxLabel = document.createElement("label");
      checkboxLabel.innerHTML = `
        <input type="checkbox" name="${answer.text}" value="${answer.text}"> ${answer.text}
      `;
      answerCheckbox.appendChild(checkboxLabel);
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("input", selectAnswer);
    });

  } else {
    currentQuestion.answers.forEach((answer) => {
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
}

function resetState() {
  questionElement.style.color = "";
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedElement = e.target;

  if (selectedElement.tagName === 'INPUT' && selectedElement.type === 'checkbox') {
    const isCorrect = selectedElement.checked;
    const answerText = selectedElement.value;

    const selectedAnswer = questions[currentQuestionIndex].answers.find(answer => answer.text === answerText);

    if (isCorrect && selectedAnswer.correct) {
      selectedElement.classList.add("correct");
    } else {
      selectedElement.classList.add("incorrect");
    }

    // Kolla om det är sista checkboxen och om alla är korrekta
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const lastCheckbox = checkboxes[checkboxes.length - 1];
    if (selectedElement === lastCheckbox) {
      const selectedCheckboxAnswers = getSelectedCheckboxAnswers();
      const allCorrect = selectedCheckboxAnswers.every(answer => answer.correct);

      if (allCorrect) {
        score++;
      }
    }
  } else {
    // Hantera befintlig logik för knappar
    const isCorrect = selectedElement.dataset.correct === "true";

    if (isCorrect) {
      selectedElement.classList.add("correct");
      score++;
    } else {
      selectedElement.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
      button.disabled = true;
    });
  }

  console.log('Current Score:', score);
  nextButton.style.display = "block";
}


function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}


function getSelectedCheckboxAnswers() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const selectedAnswers = [];

  checkboxes.forEach((checkbox) => {
    const answerText = checkbox.value;

    // Kolla om det finns fler frågor
    if (currentQuestionIndex < questions.length) {
      const selectedAnswer = questions[currentQuestionIndex].answers.find(answer => answer.text === answerText);
      selectedAnswers.push(selectedAnswer);
    }
  });

  // Ta bort dubbletter från de valda svaren baserat på texten
  const uniqueSelectedAnswers = Array.from(new Set(selectedAnswers.map(answer => answer.text)))
    .map(text => selectedAnswers.find(answer => answer.text === text));

  return uniqueSelectedAnswers;
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

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
