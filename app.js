let totalSeconds = 600;
let timerRunning = true;
let timerInterval;

function updateTimer() {
  if (!timerRunning) return;

  if (totalSeconds > 0) {
    totalSeconds--;

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    document.getElementById("timerDisplay").textContent = `${mins}:${
      secs < 10 ? "0" : ""
    }${secs}`;

    const percentage = (totalSeconds / 600) * 100;
    const degrees = (percentage / 100) * 360;
    document.getElementById(
      "timerRing"
    ).style.background = `conic-gradient(var(--primary-blue) ${degrees}deg, #e0e0e0 ${degrees}deg)`;
  } else {
    clearInterval(timerInterval);
    showToast("Focus session complete!");
    document.getElementById("endBtn").style.animation = "pulse 1s infinite";
  }
}

function toggleTimer() {
  timerRunning = !timerRunning;
  document.getElementById("timerRing").style.opacity = timerRunning
    ? "1"
    : "0.6";
}

timerInterval = setInterval(updateTimer, 1000);

function toggleCheckbox(element) {
  element.classList.toggle("selected");
  validateForm();
}

function selectRadio(element, groupId) {
  const group = document.getElementById(groupId);
  const items = group.querySelectorAll(".option-item");
  items.forEach((item) => item.classList.remove("selected"));
  element.classList.add("selected");
  validateForm();
}

function selectSuggestion(element) {
  const cards = document.querySelectorAll(".suggestion-card");
  cards.forEach((card) => card.classList.remove("selected"));
  element.classList.add("selected");
}

function validateForm() {
  const friendsSelected =
    document.querySelectorAll("#friendsGroup .option-item.selected").length > 0;
  const activitySelected =
    document.querySelectorAll("#activityGroup .option-item.selected").length >
    0;
  const sendBtn = document.getElementById("sendBtn");

  sendBtn.disabled = !(friendsSelected && activitySelected);
}

function sendInvite(e) {
  if (e.target.disabled) return;

  const rect = e.target.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { x, y },
    colors: ["#7dd3c0", "#ff6b9d", "#5b8ce8", "#ffd93d"],
  });

  showToast("Invites Sent Successfully! 🎉");
}

function endMeeting() {
  clearInterval(timerInterval);
  timerRunning = false;

  const card = document.getElementById("focusCard");
  card.style.opacity = "0.6";
  card.style.filter = "grayscale(100%)";

  const btn = document.getElementById("endBtn");
  btn.textContent = "Meeting Ended";
  btn.disabled = true;
  btn.style.background = "#ccc";
  btn.style.cursor = "not-allowed";

  showToast("Meeting has been ended");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

const statuses = [
  "Cafe",
  "Library",
  "In Class",
  "Walking...",
  "Gym",
  "Dorm",
  "200m away",
  "5m away",
];

function updateFriendStatus() {
  const statusElements = [
    document.getElementById("status-abhay"),
    document.getElementById("status-samridhi"),
  ];

  statusElements.forEach((el) => {
    if (Math.random() > 0.5) {
      el.textContent = statuses[Math.floor(Math.random() * statuses.length)];
      el.style.color = "var(--primary-pink)";
      setTimeout(() => (el.style.color = "#666"), 1000);
    }
  });
}

setInterval(updateFriendStatus, 5000);

function handleSearch() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const searchables = document.querySelectorAll(".searchable");

  searchables.forEach((item) => {
    const text = item.textContent || item.innerText;
    if (filter && text.toUpperCase().indexOf(filter) > -1) {
      item.classList.add("highlight");
    } else {
      item.classList.remove("highlight");
    }
  });
}

validateForm();
