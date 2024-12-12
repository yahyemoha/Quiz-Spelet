const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback"); 

let currentIndex = 0; 
let score = 0; 
let questions = []; 

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  questionElement.style.display = "block";
  optionsElement.style.display = "block";
  nextButton.style.display = "none";

  fetch("Quiz.json")
    .then(response => response.json())
    .then(data => {
      questions = data;
      showQuestion(); 
    });
});

function showQuestion() {
  const currentQuestion = questions[currentIndex];
  questionElement.textContent = currentQuestion.question; 
  optionsElement.innerHTML = ""; 

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option, currentQuestion.answer));
    optionsElement.appendChild(button);
  });

  feedbackElement.style.display = "none"; 
}

function checkAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    score++; 
    feedbackElement.textContent = "Rätt svar!";
    feedbackElement.style.color = "green"; 
  } else {
    feedbackElement.textContent = `Fel svar!`; 
    feedbackElement.style.color = "red";
  }

  feedbackElement.style.display = "block"; 
  nextButton.style.display = "block"; 
}

nextButton.addEventListener("click", () => {
  currentIndex++; 
  if (currentIndex < questions.length) {
    showQuestion(); 
    nextButton.style.display = "none";
  } else {
    showScore(); 
  }
});

function showScore() {
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  nextButton.style.display = "none";

  scoreElement.style.display = "block";
  scoreElement.innerHTML = `<h2>Spelet är slut! Din poäng är: ${score}/${questions.length}</h2>`;
}