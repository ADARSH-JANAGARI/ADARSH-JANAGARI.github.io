const displayText = document.getElementById("display-text");
const typingInput = document.getElementById("typing-input");
const wpmDisplay = document.getElementById("wpm span");
const accuracyDisplay = document.getElementById("accuracy span");
const timeLeftDisplay = document.getElementById("time-left span");
const restartBtn = document.getElementById("restart-btn");

let timer;
let timeLeft = 60;
let typedText = "";
let correctChars = 0;
let totalChars = 0;
let started = false;

const originalText = displayText.innerText;

function startTypingTest() {
  if (!started) {
    started = true;
    timer = setInterval(updateTime, 1000);
  }
}

function updateTime() {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftDisplay.innerText = `${timeLeft}s`;
  } else {
    clearInterval(timer);
    typingInput.disabled = true;
  }
}

function calculateWPM() {
  const words = typedText.trim().split(/\s+/).length;
  const wpm = Math.floor((words / (60 - timeLeft)) * 60);
  wpmDisplay.innerText = wpm;
}

function calculateAccuracy() {
  const inputText = typingInput.value;
  totalChars = inputText.length;
  correctChars = 0;

  for (let i = 0; i < totalChars; i++) {
    if (inputText[i] === originalText[i]) {
      correctChars++;
    }
  }

  const accuracy = Math.floor((correctChars / totalChars) * 100);
  accuracyDisplay.innerText = accuracy + "%";
}

typingInput.addEventListener("input", () => {
  typedText = typingInput.value;
  calculateWPM();
  calculateAccuracy();
});

restartBtn.addEventListener("click", () => {
  clearInterval(timer);
  timeLeft = 60;
  timeLeftDisplay.innerText = `${timeLeft}s`;
  typedText = "";
  typingInput.value = "";
  typingInput.disabled = false;
  started = false;
});

typingInput.addEventListener("focus", startTypingTest);
