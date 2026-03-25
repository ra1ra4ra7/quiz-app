const quizData = [
  {
    question: "What does CPU stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Utility"],
    correct: "Central Processing Unit"
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correct: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Tool Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Markup Language"],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "What is the brain of the computer?",
    options: ["RAM", "CPU", "Hard Disk", "Keyboard"],
    correct: "CPU"
  },
  {
    question: "Which device is used to store data permanently?",
    options: ["RAM", "ROM", "Hard Disk", "Cache"],
    correct: "Hard Disk"
  }
];

const quizDiv = document.getElementById("quiz");

function loadQuiz() {
  quizDiv.innerHTML = "";

  quizData.forEach((q, index) => {
    let questionHTML = `
      <div class="question">
        <h3>${q.question}</h3>
    `;

    q.options.forEach(option => {
      questionHTML += `
        <label>
          <input type="radio" name="q${index}" value="${option}">
          ${option}
        </label><br>
      `;
    });

    questionHTML += `</div>`;

    quizDiv.innerHTML += questionHTML;
  });
}

async function submitQuiz() {
  let score = 0;

  quizData.forEach((q, index) => {
    const answer = document.querySelector(`input[name="q${index}"]:checked`);
    if (answer && answer.value === q.correct) {
      score++;
    }
  });

  const name = document.getElementById("name").value;

  await fetch("/save-score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, score })
  });

  alert("Score saved!");
  loadScores();
}

async function loadScores() {
  const res = await fetch("/scores");
  const data = await res.json();

  const scoresList = document.getElementById("scores");
  scoresList.innerHTML = "";

  data.forEach((s, index) => {
    scoresList.innerHTML += `<li>#${index + 1} ${s.name} - ${s.score}</li>`;
  });
}

loadQuiz();
loadScores();