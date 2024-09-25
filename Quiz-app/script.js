const questions = [
  {
    question: "Which is the largest country in the world?",
    answer: [
      { text: "India", correct: false },
      { text: "China", correct: false },
      { text: "Russia", correct: true },
      { text: "Japan", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answer: [
      { text: "Vatican City", correct: true },
      { text: "Sri Lanka", correct: false },
      { text: "Russia", correct: false },
      { text: "Japan", correct: false },
    ],
  },
  {
    question: "Which is the largest river in the world?",
    answer: [
      { text: "Ganga", correct: false },
      { text: "Nile", correct: true },
      { text: "Yamuna", correct: false },
      { text: "Brahmaputra", correct: false },
    ],
  },
  {
    question: "Which is the tallest building in the world?",
    answer: [
      { text: "Shanghai Tower", correct: false },
      { text: "Lotte World Tower", correct: false },
      { text: "Burj Khalifa", correct: true },
      { text: "Taipei 101", correct: false },
    ],
  },
  {
    question: "Which is the largest lake in the world?",
    answer: [
      { text: "Lake Malvi", correct: false },
      { text: "Lake Tanganyika", correct: false },
      { text: "Lake Baikal", correct: false },
      { text: "Caspian Sea", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const timeDisplay = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer =0;
const totalTime = 30;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none"; // Hide next button initially
  startTimer(); // Start the timer
  showQuestion();
}

function startTimer() {
  var timeLeft = totalTime;
  timeDisplay.innerHTML = timeLeft; // Display initial time
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerHTML = timeLeft; // Update displayed time
    if (timeLeft == 0) {
      clearInterval(timer); // Stop timer
      displayResults(); // Automatically show results when time runs out
    }
  }, 1000);
}

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  answerButton.innerHTML = ""; // Clear previous answers

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn"); // Add class for styling
    button.addEventListener("click", () => selectAnswer(answer));
    answerButton.appendChild(button); // Append button to answer container
  });
}

function selectAnswer(answer) {
  const correct = answer.correct;
  if (correct) {
    score++;
  }
  Array.from(answerButton.children).forEach((button) => {
    button.disabled = true; // Disable all buttons after selection
    if (button.innerHTML === answer.text) {
      button.classList.add(correct ? "correct" : "incorrect"); // Add class based on correctness
    } else {
      // Highlight the correct answer
      const question = questions[currentQuestionIndex];
      question.answer.forEach((ans) => {
        if (ans.correct) {
          if (button.innerHTML === ans.text) {
            button.classList.add("correct");
          }
        }
      });
    }
  });
  nextButton.style.display = "block"; // Show the next button
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    
  } else {
    displayResults();
    clearInterval(timer); // Stop timer
  }
});

function displayResults() {
  questionElement.innerHTML = `Quiz finished! Your score is ${score} out of ${questions.length}.`;
  answerButton.innerHTML = ""; // Clear answers
  nextButton.style.display = "none"; // Hide the next button

  questions.forEach((q, index) => {
    const result = document.createElement("div");
    result.innerHTML = `<strong>${index + 1}. ${
      q.question
    }</strong><br>Correct Answer: ${q.answer.find((a) => a.correct).text}<br>`;
    answerButton.appendChild(result);
  });

  // Restart the quiz button
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart Quiz";
  restartButton.classList.add("btn");
  restartButton.addEventListener("click", startQuiz);
  answerButton.appendChild(restartButton);
}

startQuiz();
