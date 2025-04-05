const questions = [
  // easy
  [
    {
      question: "What event is believed to have started the universe?",
      choices: [
        "Supernova",
        "Big Bang",
        "Black Hole Explosion",
        "Cosmic Storm",
      ],
      correctAnswer: "Big Bang",
    },
    {
      question:
        "What is the name of the galaxy that contains our solar system?",
      choices: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
      correctAnswer: "Milky Way",
    },
    {
      question: "What force keeps planets in orbit around stars?",
      choices: ["Magnetism", "Gravity", "Electromagnetism", "Nuclear Force"],
      correctAnswer: "Gravity",
    },
    {
      question: "What is the center of the solar system?",
      choices: ["Earth", "Moon", "The Sun", "Jupiter"],
      correctAnswer: "The Sun",
    },
    {
      question: "What is the smallest planet in our solar system?",
      choices: ["Mars", "Venus", "Mercury", "Pluto"],
      correctAnswer: "Mercury",
    },
    {
      question: "What planet is known for its massive rings?",
      choices: ["Jupiter", "Saturn", "Neptune", "Uranus"],
      correctAnswer: "Saturn",
    },
    {
      question:
        "Which planet is often called Earth's 'twin' due to its similar size and composition?",
      choices: ["Mars", "Mercury", "Venus ", "Neptune"],
      correctAnswer: "Venus",
    },
    {
      question:
        "What is a group of stars, dust, and gas held together by gravity called?",
      choices: ["Asteroid Belt", "Galaxy", "Nebula", "Black Hole"],
      correctAnswer: "Galaxy",
    },
    {
      question: "What is a black hole?",
      choices: [
        "A hole in space",
        "A collapsed star with immense gravity",
        "A giant asteroid",
        "A dense planet",
      ],
      correctAnswer: "A collapsed star with immense gravity",
    },
    {
      question: "What is the name of Earth's only natural satellite?",
      choices: ["Phobos", "Titan", "The Moon", "Europa"],
      correctAnswer: "The Moon",
    },
  ],
  // medium or intermediate
  [
    {
      question:
        "What cosmic phenomenon is responsible for the expansion of the universe?",
      choices: ["Dark Energy", "Dark Matter", "Cosmic Rays", "Solar Wind"],
      correctAnswer: "Dark Energy",
    },
    {
      question: "What element makes up most of the Sun's mass?",
      choices: ["Helium", "Oxygen", "Hydrogen ", "Carbon"],
      correctAnswer: "Hydrogen",
    },
    {
      question:
        "What is the name of the mysterious force that makes up about 27% of the universe's mass-energy content?",
      choices: [
        "Antimatter",
        "Dark Matter",
        "Cosmic Radiation",
        "Supernova Remnants",
      ],
      correctAnswer: "Dark Matter",
    },
    {
      question: "What type of galaxy is the Milky Way?",
      choices: ["Elliptical", "Spiral", "Irregular", "Lenticular"],
      correctAnswer: "Spiral",
    },
    {
      question: "What is the cosmic background radiation?",
      choices: [
        "Energy from black holes",
        "Leftover radiation from the Big Bang",
        "Light from distant stars",
        "Radiation from the Sun",
      ],
      correctAnswer: "Leftover radiation from the Big Bang",
    },
    {
      question:
        "What is the name of the largest asteroid in the asteroid belt?",
      choices: ["Vesta", "Pallas", "Ceres", "Hygiea"],
      correctAnswer: "Ceres",
    },
  ],
  [
    // hard
    {
      question:
        "What is the term for the hypothetical point where all matter in the universe was once concentrated before the Big Bang?",
      choices: ["Singularity", "Cosmic Core", "Gravity Well", "Quantum Nexus"],
      correctAnswer: "Singularity",
    },
    {
      question:
        "Which law explains the movement of galaxies away from each other, supporting the expanding universe theory?",
      choices: [
        "Hubble's Law",
        "Kepler's Law",
        "Newton's Third Law",
        "Einstein's Relativity",
      ],
      correctAnswer: "Hubble's Law",
    },
    {
      question:
        "What is the name of the region surrounding a black hole beyond which nothing can escape?",
      choices: [
        "Photon Sphere",
        "Event Horizon",
        "Schwarzschild Boundary",
        "Singularity",
      ],
      correctAnswer: "Event Horizon",
    },
    {
      question:
        "What element was first discovered in the Sun before being found on Earth?",
      choices: ["Hydrogen", "Helium", "Neon", "Lithium"],
      correctAnswer: "Helium",
    },
    {
      question:
        "What is the name of the structure thought to form the largest cosmic 'web' of galaxies in the universe?",
      choices: [
        "Cosmic Threads",
        "Large-Scale Structure",
        "Galactic Mesh",
        "Supercluster Network",
      ],
      correctAnswer: "Large-Scale Structure",
    },
    {
      question:
        "What is the mysterious form of energy that is accelerating the expansion of the universe?",
      choices: ["Dark Energy", "Cosmic Rays", "Antimatter", "Quantum Force"],
      correctAnswer: "Dark Energy",
    },
  ],
];
document.addEventListener("DOMContentLoaded", function() {
  const choose = document.querySelector(".container");
  const quizContainer = document.querySelector(".quizContainer");
  const easy = document.querySelector(".easy");
  const medium = document.querySelector(".medium");
  const hard = document.querySelector(".hard");
  let difficulty = 0;
  let currentQuestion = 0;
  let score = 0;
  let btnEnable = true;

  quizContainer.style.display = 'none';


  easy.addEventListener("click", () => {
    difficulty = 0; 
    startQuiz();
  });

  medium.addEventListener("click", () => {
    difficulty = 1;
    startQuiz();
  });

  hard.addEventListener("click", () => {
    difficulty = 2; 
    startQuiz();
  });

  function startQuiz() {
    choose.style.display = "none";
    //quizContainer.style.cssText = "display: flex !important;";
    currentQuestion = 0;
    score = 0;
    displayQuestion();
  }

  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const current = questions[difficulty][currentQuestion];

    questionElement.textContent = current.question;
    choicesElement.innerHTML = "";

    current.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.textContent = choice;
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
        questionElement.textContent = `Quiz completed! Your score: ${score} / ${questions[difficulty].length}`;
        choicesElement.innerHTML = "";
      }
      btnEnable = true;
    }, 750);
  }
});