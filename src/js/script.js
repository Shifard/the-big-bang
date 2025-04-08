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
  const scorePanel = document.querySelector(".score-panel");

  // Player variables
  let difficulty = 0;
  let currentQuestion = 0;
  let score = 0;
  let btnEnable = true;

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
    alert("TODO");
    showHomeScreen();
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
    displayQuestion();
  }

  function showResultsScreen(score, totalQuestions) {
    console.log(`${score} / ${totalQuestions}`);
    setElementText(footerTitle, `Score: ${score} / ${totalQuestions}`);
    hideScreens(homeScreen, quizScreen, difficultyScreen);
    modeNavItem.classList.remove("active");
    showScreens(header, resultsScreen);
  }

  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const current = questions[difficulty][currentQuestion];

    setElementText(questionElement, current.question);
    setElementText(footerTitle, `Question ${currentQuestion + 1}`);
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
    const current = questions[difficulty][currentQuestion];
    btnEnable = false;

    if (selectedAnswer === current.correctAnswer) {
      selectedBtn.style.backgroundColor = "var(--green)";
      score++;
    } else {
      selectedBtn.style.backgroundColor = "var(--red)";
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
