import { questions } from "./questions.js";
import { choicePrefixes } from "./questions.js";

document.addEventListener("DOMContentLoaded", function() {
  // Screens
  const header = document.querySelector(".header");
  const homeScreen = document.querySelector(".home-screen");
  const difficultyScreen = document.querySelector(".difficulty-screen");
  const quizScreen = document.querySelector(".quiz-screen");
  const resultsScreen = document.querySelector(".results-screen");
  const footer = document.querySelector(".footer");

  // Buttons
  const startButton = document.querySelector(".start-button");
  const easyButton = document.querySelector(".easy-button");
  const mediumButton = document.querySelector(".medium-button");
  const hardButton = document.querySelector(".hard-button");
  const retryButton = document.querySelector(".retry-button");
  const homeButton = document.querySelector(".home-button");
  const answersButton = document.querySelector(".answers-button");

  // Navigation and Elements
  const headerTitle = document.querySelector(".header-title");
  const homeNavItem = document.querySelector(".home-nav-item");
  const modeNavItem = document.querySelector(".mode-nav-item");
  const footerTitle = document.querySelector(".footer-title");

  // Create a new container for answers review
  const answersContainer = document.createElement("div");
  answersContainer.className = "answers-container";
  resultsScreen.appendChild(answersContainer);

  // Player variables
  let difficulty = 0;
  let currentQuestion = 0;
  let score = 0;
  let btnEnable = true;
  let userAnswers = [];
  let isShowingAnswers = false;

  // Hide elements on load
  hideScreens(header, difficultyScreen, quizScreen, resultsScreen);

  headerTitle.addEventListener("click", ()=> {
    showHomeScreen();
  });

  homeNavItem.addEventListener("click", () => {
    showHomeScreen();
  });

  modeNavItem.addEventListener("click", () => {
    showDifficultyScreen();
  });

  startButton.addEventListener("click", () => {
    showDifficultyScreen();
  });

  easyButton.addEventListener("click", () => {
    difficulty = 0;
    setElementText(headerTitle, "Easy");
    showQuizScreen();
  });

  mediumButton.addEventListener("click", () => {
    difficulty = 1;
    setElementText(headerTitle, "Medium");
    showQuizScreen();
  });

  retryButton.addEventListener("click", ()=> {
    showDifficultyScreen();
  });

  homeButton.addEventListener("click", () => {
    showHomeScreen();
  });

  answersButton.addEventListener("click", () => {
    if (isShowingAnswers) {
      answersContainer.style.display = "none";
      document.querySelector(".results-buttons").style.display = "flex";
      setElementText(answersButton, "Answers");
      isShowingAnswers = false;
    } else {
      showAnswers();
      document.querySelector(".results-buttons").style.display = "none";
      setElementText(answersButton, "Back");
      isShowingAnswers = true;
    }
  });

  hardButton.addEventListener("click", () => {
    difficulty = 2;
    setElementText(headerTitle, "Hard");
    showQuizScreen();
  });

  // Helper Functions
  function hideScreens() {
    if (arguments.length == 0) {
      return;
    }

    for (let i = 0; i < arguments.length; i++) {
      arguments[i].style.display = "none";
    }
    return;
  }

  function showScreens() {
    if (arguments.length == 0) {
      return;
    }

    for (let i = 0; i < arguments.length; i++) {
      arguments[i].style.display = "flex";
    }
    return;
  }

  function setElementText(element, content) {
    element.textContent = content;
  }

  // Quiz Functions
  function resetQuiz() {
    difficulty = -1;
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    isShowingAnswers = false;
  }

  function showHomeScreen() {
    hideScreens(header, difficultyScreen, quizScreen, resultsScreen);
    setElementText(footerTitle, "Group 2");
    showScreens(homeScreen);
  }

  function showDifficultyScreen() {
    hideScreens(homeScreen, quizScreen, resultsScreen);
    modeNavItem.classList.add("active");
    showScreens(header, difficultyScreen);
    setElementText(headerTitle, "The Big Bang");
    setElementText(footerTitle, "");
    resetQuiz();
  }

  function showQuizScreen() {
    hideScreens(homeScreen, difficultyScreen, resultsScreen);
    modeNavItem.classList.remove("active");
    showScreens(header, quizScreen);
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    displayQuestion();
  }

  function showResultsScreen(score, totalQuestions) {
    answersContainer.innerHTML = "";
    answersContainer.style.display = "none";
    document.querySelector(".results-buttons").style.display = "flex";
    
    const resultsTitle = document.querySelector(".results-title");
    setElementText(resultsTitle, `HOW'S THE\nTRIP?`);
    setElementText(footerTitle, `Score: ${score} / ${totalQuestions}`);
    
    setElementText(answersButton, "Answers");
    isShowingAnswers = false;
    
    hideScreens(homeScreen, quizScreen, difficultyScreen);
    modeNavItem.classList.remove("active");
    showScreens(header, resultsScreen, footer);
  }

  function showAnswers() {
    answersContainer.innerHTML = "";
    answersContainer.style.display = "flex";

    const backBtn = document.createElement("button");
    backBtn.className = "back-button";
    backBtn.innerHTML = "&#8592;"; 
    answersContainer.appendChild(backBtn); 
  
    backBtn.addEventListener("click", () => {
      answersContainer.style.display = "none";
      document.querySelector(".results-buttons").style.display = "flex";
      setElementText(answersButton, "Answers");
      isShowingAnswers = false;
    });
    
    const heading = document.createElement("h2");
    heading.className = "answers-heading";
    heading.textContent = "Your Answers";
    answersContainer.appendChild(heading);
    
    const questionsReview = document.createElement("div");
    questionsReview.className = "questions-review";
    
    for (let i = 0; i < questions[difficulty].length; i++) {
      const q = questions[difficulty][i];
      const userAnswer = userAnswers[i] || "Not answered";
      const isCorrect = userAnswer === q.correctAnswer;

      const questionDiv = document.createElement("div");
      questionDiv.className = "review-question";
      
      const questionText = document.createElement("h3");
      questionText.textContent = `Q${i+1}: ${q.question}`;
      questionDiv.appendChild(questionText);

      const userAnswerDiv = document.createElement("div");
      userAnswerDiv.className = `user-answer ${isCorrect ? 'correct' : 'incorrect'}`;
      userAnswerDiv.textContent = `Your answer: ${userAnswer} ${isCorrect ? '✓' : '✗'}`;
      questionDiv.appendChild(userAnswerDiv);

      if (!isCorrect) {
        const correctAnswer = document.createElement("div");
        correctAnswer.className = "correct-answer";
        correctAnswer.textContent = `Correct answer: ${q.correctAnswer}`;
        questionDiv.appendChild(correctAnswer);
      }

      if (i < questions[difficulty].length - 1) {
        const separator = document.createElement("hr");
        questionDiv.appendChild(separator);
      }
      
      questionsReview.appendChild(questionDiv);
    }
    
    answersContainer.appendChild(questionsReview);
  }

  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const current = questions[difficulty][currentQuestion];

    setElementText(questionElement, current.question);
    setElementText(footerTitle, `Question ${currentQuestion + 1} of ${questions[difficulty].length}`);
    choicesElement.innerHTML = "";

    current.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      setElementText(button, choicePrefixes[index] + " " + choice);
      button.onclick = () => checkAnswer(choice, button);
      choicesElement.appendChild(button);
    });
  }

  function checkAnswer(selectedAnswer, selectedBtn) {
    if (!btnEnable) return;
    
    const current = questions[difficulty][currentQuestion];
    btnEnable = false;

    userAnswers[currentQuestion] = selectedAnswer;

    if (selectedAnswer === current.correctAnswer) {
      selectedBtn.style.backgroundColor = "var(--green-variation-0)";
      score++;
    } else {
      selectedBtn.style.backgroundColor = "var(--red)";
      
      const buttons = document.querySelectorAll(".choice-button");
      buttons.forEach(btn => {
        if (btn.textContent.includes(current.correctAnswer)) {
          btn.style.backgroundColor = "var(--green-variation-0)";
        }
      });
    }

    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions[difficulty].length) {
        displayQuestion();
      } else {
        showResultsScreen(score, questions[difficulty].length);
      }
      btnEnable = true;
    }, 750);
  }
});