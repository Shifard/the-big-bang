import { questions } from "./questions.js";
import { choicePrefixes } from "./questions.js";

document.addEventListener("DOMContentLoaded", function() {
  // Screens
  const difficultyScreen = document.querySelector(".difficulty-screen");
  const quizScreen = document.querySelector(".quiz-screen");
  const resultsScreen = document.querySelector(".results-screen");

  // Buttons
  const easyButton = document.querySelector(".easy-button");
  const mediumButton = document.querySelector(".medium-button");
  const hardButton = document.querySelector(".hard-button");

  // Navigation and Elements
  const headerTitle = document.querySelector(".header-title");
  const gamemodeNavItem = document.querySelector(".gamemode-nav");
  const footerTitle = document.querySelector(".footer-title");

  // Player variables
  let difficulty = 0;
  let currentQuestion = 0;
  let score = 0;
  let btnEnable = true;

  // Hide elements on load
  hideScreens(quizScreen, resultsScreen);

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

  hardButton.addEventListener("click", () => {
    difficulty = 2;
    setElementText(headerTitle, "Hard");
    showQuizScreen();
  });

  gamemodeNavItem.addEventListener("click", () => {
    showDifficultyScreen();
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

  function showDifficultyScreen() {
    showScreens(difficultyScreen);
    hideScreens(quizScreen, resultsScreen);
    setElementText(headerTitle, "The Big Bang");
    setElementText(footerTitle, "");
    resetQuiz();
  }

  function showQuizScreen() {
    showScreens(quizScreen);
    hideScreens(difficultyScreen, resultsScreen);
    currentQuestion = 0;
    score = 0;
    displayQuestion();
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
        const choicesElement = document.getElementById("choices");
        const questionElement = document.getElementById("question");
        setElementText(footerTitle, '');
        setElementText(
          questionElement,
          `Quiz completed! Your score: ${score} / ${questions[difficulty].length}`,
        );
        choicesElement.innerHTML = "";
      }
      btnEnable = true;
    }, 750);
  }
});
