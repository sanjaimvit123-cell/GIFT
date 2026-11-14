document.body.classList.add("cake-mode");

// Screen navigation
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => screen.classList.remove("active"));

  const nextScreen = document.getElementById(screenId);
  if (!nextScreen) return;

  nextScreen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (screenId === "final") createCelebration();
}

function enableWebsiteAfterCake() {
  document.body.classList.remove("cake-mode");
  const website = document.querySelector(".website");
  if (website) website.removeAttribute("inert");
  showScreen("welcome");
}

// Let the birthday wish happen before the original website begins
let candlesBlownOut = false;
let cakeCuttingStarted = false;

function blowCandles() {
  if (candlesBlownOut || cakeCuttingStarted) return;

  candlesBlownOut = true;
  document.getElementById("cakeStage").classList.add("candles-out");
  document.getElementById("blowCandlesButton").disabled = true;
  document.getElementById("cutCakeButton").disabled = true;
  document.getElementById("cakeInstruction").textContent = "Wish made! Your candles are out — now for the cake.";
  createCakeCelebration();

  window.setTimeout(() => {
    document.getElementById("cutCakeButton").disabled = false;
  }, 850);
}

function cutCake() {
  if (!candlesBlownOut || cakeCuttingStarted) return;

  cakeCuttingStarted = true;
  const stage = document.getElementById("cakeStage");
  const cutButton = document.getElementById("cutCakeButton");

  stage.classList.add("cake-cutting");
  cutButton.disabled = true;
  document.getElementById("cakeInstruction").textContent = "A slice of birthday happiness, just for you.";

  window.setTimeout(() => {
    const intro = document.getElementById("cakeIntro");
    intro.classList.add("cake-intro-leaving");

    window.setTimeout(() => {
      intro.hidden = true;
      enableWebsiteAfterCake();
      const welcomeButton = document.querySelector("#welcome .main-button");
      if (welcomeButton) welcomeButton.focus({ preventScroll: true });
    }, 850);
  }, 1350);
}

function createCakeCelebration() {
  const colors = ["#f6e5b8", "#d9b875", "#fff4d6", "#a94e37"];

  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("span");
    piece.className = "cake-confetti";
    piece.style.left = `${38 + Math.random() * 24}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--cake-drift", `${Math.random() * 180 - 90}px`);
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 2200);
  }
}

// Quiz: only the chosen sibling answer unlocks the next screen
function checkAnswer(isCorrect, button) {
  const feedback = document.getElementById("quizFeedback");
  const answers = document.querySelectorAll(".answer");

  if (isCorrect) {
    feedback.textContent = "Correct! 😂❤️ You're stuck with your annoying brother forever!";
    button.classList.add("selected-answer");
    answers.forEach(answer => answer.disabled = true);
    setTimeout(() => showScreen("wishes"), 1700);
  } else {
    feedback.textContent = "Wrong answer! 😂 Try again, Abi. Think carefully!";
    button.classList.add("wrong-answer");
    setTimeout(() => button.classList.remove("wrong-answer"), 550);
  }
}

// Create soft floating gold particles
function createParticles() {
  const container = document.getElementById("particles");
  if (!container || container.childElementCount) return;

  for (let i = 0; i < 32; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";

    const size = 2 + Math.random() * 4;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${7 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 12}s`;

    container.appendChild(particle);
  }
}

// One-time confetti burst when the final screen opens
function createCelebration() {
  const finalScreen = document.getElementById("final");

  if (finalScreen.dataset.celebrated === "true") return;

  finalScreen.dataset.celebrated = "true";

  const colors = [
    "#e2c27d",
    "#fff4d6",
    "#c5a15e",
    "#f6d98b",
    "#b18b49"
  ];

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${3.5 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);

    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 8500);
  }
}

// Let Abi replay the whole surprise
function restartJourney() {
  const finalScreen = document.getElementById("final");

  finalScreen.dataset.celebrated = "false";

  document.querySelectorAll(".answer").forEach(answer => {
    answer.disabled = false;
    answer.classList.remove("selected-answer", "wrong-answer");
  });

  document.getElementById("quizFeedback").textContent = "";

  showScreen("welcome");
}

// Open the birthday photo in a full-screen viewer
function openPhoto() {
  const viewer = document.getElementById("photoLightbox");

  if (!viewer) return;

  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  const closeButton = viewer.querySelector(".photo-close");

  if (closeButton) {
    closeButton.focus();
  }
}

// Close the viewer using the close button or dark backdrop
function closePhoto(event) {
  if (event && event.target !== event.currentTarget) return;

  const viewer = document.getElementById("photoLightbox");

  if (!viewer) return;

  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

// Close photo viewer by pressing Escape
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePhoto();
  }
});

// Start floating particles when page loads
document.addEventListener("DOMContentLoaded", createParticles);