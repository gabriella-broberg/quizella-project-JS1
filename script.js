const questions = [
  {
    question:
      "I filmen 'Unbreakable' spelar Samuel L. Jackson en karaktär med sköra ben och smeknamnet 'Mr. Glass'. Vilken färg är ofta förknippad med hans karaktär?",
    type: "multipleChoice",
    answers: [
      { text: "Neonrosa", correct: false },
      { text: "Lila", correct: true },
      { text: "Orange", correct: false },
      { text: "Svart", correct: false },
    ],
  },

  {
    question:
      "Vad är den dominerande färgen i albumomslaget för Taylor Swifts '1989'?",
    type: "multipleChoice",
    answers: [
      { text: "Orange", correct: false },
      { text: "Peach", correct: true },
      { text: "Rosa", correct: false },
      { text: "Svart", correct: false },
    ],
  },
  {
    question:
      "Vilken filmregissör är känd för att använda starka neonfärger i sina filmer, som 'Blade Runner'?",
    type: "multipleChoice",
    answers: [
      { text: "Christopher Nolan", correct: false },
      { text: "Quentin Tarantino", correct: false },
      { text: "Ridley Scott", correct: true },
      { text: "Martin Scorsese", correct: false },
    ],
  },
  {
    question:
      "Vilken av följande kändisar är känd för att ha en varumärkesfärg i neonorange?",
    type: "multipleChoice",
    answers: [
      { text: "Kanye West", correct: true },
      { text: "Kim Kardashian", correct: false },
      { text: "Drake", correct: false },
      { text: "Taylor Swift", correct: false },
    ],
  },
  {
    question:
      "Vilken artist är känd för att ha lila som en av sina signaturfärger?",
    type: "multipleChoice",
    answers: [
      { text: "Ariana Grande", correct: false },
      { text: "Bruno Mars", correct: false },
      { text: "Lizzo", correct: true },
      { text: "Shawn Mendes", correct: false },
    ],
  },

  {
    question:
      "Prince, även känd som 'The Purple One', bar ofta lila kläder under sina konserter.",
    type: "trueFalse",
    answers: [
      { text: "Sant", correct: true },
      { text: "Falskt", correct: false },
    ],
  },

  {
    question: "Madonna är känd för att ha en signaturfärg i neonrosa.",
    type: "trueFalse",
    answers: [
      { text: "Sant", correct: false },
      { text: "Falskt", correct: true },
    ],
  },
  {
    question: "Vilka av följande TV-serier har lila som en framträdande färg i sina titelkrediter? (flera svar) ",
    type: "checkbox",
    answers: [
      { text: "Breaking Bad", correct: false },
      { text: "Stranger Things", correct: false },
      { text: "The Crown", correct: true },
      { text: "Game of Thrones", correct: true },
    ],
  },
  {
    question:
      "Vilka av följande filmer har neonpeach som en framträdande färg i sina scenografi? (flera svar)",
    type: "checkbox",
    answers: [
      { text: "La La Land", correct: false },
      { text: "Call Me By Your Name", correct: true },
      { text: "The Grand Budapest Hotel", correct: false },
      { text: "Her", correct: true },
    ],
  },
  {
    question:
      "Vilka av följande artister har använt neonrosa som en dominerande färg i sina musikvideor? (flera svar)",
    type: "checkbox",
    answers: [
      { text: "Katy Perry", correct: true },
      { text: "Sia", correct: false },
      { text: "Nicki Minaj", correct: true },
      { text: "John Legend", correct: false },
    ],
  },
];


// JavaScript code to toggle between light and dark mode
const toggleModeBtn = document.getElementById("toggle-mode-btn");
const body = document.body;

toggleModeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  // Toggle the icon and text content of the button
  const currentMode = body.classList.contains("light-mode") ? { icon: "moon", text: "" } : { icon: "sun", text: "" };
  toggleModeBtn.innerHTML = `<i class="fas fa-${currentMode.icon}"></i> ${currentMode.text}`;
});


// Get the HTML elements representing the quiz components
const questionElement = document.getElementById("question");
const answerCheckboxes = document.getElementById("answer-checkboxes");
const nextButton = document.getElementById("next-btn");

// Store the index of the current question and the user's score
let currentQuestionIndex = 0; //Index will start from 0
let score = 0;

// Arrays to store selected answers and user responses
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

  // Show the first question
  showQuestion();
}

// Function to display a question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Loop through answers and create checkboxes
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

    // Add event listener to checkboxes
    checkbox.addEventListener("change", selectAnswer);
  });
}

// Function to reset the state of the quiz
function resetState() {
  nextButton.style.display = "none";
  questionElement.style.color = ""; // Reset text color
  while (answerCheckboxes.firstChild) {
    answerCheckboxes.removeChild(answerCheckboxes.firstChild);
  }
}

// Function to display the user's score and feedback
function showScore() {
  resetState();
  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;

  let resultText = `Du fick ${score} av ${totalQuestions} rätt!`;
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

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");

  // Display correct/incorrect information for each question
  userResponses.forEach((response, index) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    resultItem.innerHTML = `<br>${index + 1}: <span style="color: ${
      response.correct ? "green" : "red"
    }">${response.correct ? "Rätt" : "Fel"}</span>`;

    // Display the selected answers
    if (response.userSelections.length > 0) {
      resultItem.innerHTML += `<br>Du svarade: ${response.userSelections.join(
        ", "
      )}`;
    }

    // Display the correct answers
    resultItem.innerHTML += `<br>Facit: ${questions[index].answers
      .filter((answer) => answer.correct)
      .map((answer) => answer.text)
      .join(", ")}`;

    resultContainer.appendChild(resultItem);
  });

  document.getElementById("feedback-container").appendChild(resultContainer);

  document.getElementById("question").innerHTML = resultText;
  document.getElementById("question").style.color = resultClass;
  document.getElementById("question").classList.add(resultClass);

  nextButton.innerHTML = "Spela igen!";
  nextButton.style.display = "block";
}

// Function to handle the user's answer selection
function selectAnswer(e) {
  const selectedCheckbox = e.target;

  if (selectedCheckbox.checked) {
    selectedCheckbox.classList.add("selected");
    selectedAnswers.push(selectedCheckbox.value);
  } else {
    selectedCheckbox.classList.remove("selected");
    selectedAnswers = selectedAnswers.filter(
      (value) => value !== selectedCheckbox.value
    );
  }

  nextButton.style.display = "block";
}
// Function to handle the "Next" button click
function handleNextButton() {
  // Check correctness only when the user clicks "Next"
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswers = currentQuestion.answers
    .filter((answer) => answer.correct)
    .map((answer) => answer.text);

  const allCorrectSelected =
    selectedAnswers.length === correctAnswers.length &&
    selectedAnswers.every((value) => correctAnswers.includes(value));

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

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();



