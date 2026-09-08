const mainWindow = document.querySelector("#main-window");
const startButton = document.querySelector("#start-button");
const startMenu = document.querySelector("#start-menu");
const taskButton = document.querySelector("#task-button");
const addressForm = document.querySelector("#address-form");
const clock = document.querySelector("#clock");
const portfolio = document.querySelector("#portfolio-root");
const dragHandle = document.querySelector("#window-drag-handle");

let maximized = false;
let dragState = null;
let restoredGeometry = null;
const pageRoutes = {
  home: "index.html",
  about: "about.html",
  skills: "skills.html",
  experience: "experience.html",
  projects: "projects.html",
  contact: "contact.html"
};

function navigateToPage(page) {
  window.location.href = pageRoutes[page] || pageRoutes.home;
}

function setWindowVisible(visible) {
  mainWindow.classList.toggle("minimized", !visible);
  mainWindow.classList.remove("closed");
  taskButton.classList.toggle("active", visible);
}

function toggleStartMenu(forceOpen) {
  const shouldOpen = forceOpen ?? startMenu.hidden;
  startMenu.hidden = !shouldOpen;
  startButton.classList.toggle("open", shouldOpen);
  startButton.setAttribute("aria-expanded", String(shouldOpen));
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  clock.dateTime = now.toISOString();
}

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-window-action]");
  if (actionButton) {
    const action = actionButton.dataset.windowAction;

    if (action === "minimize") {
      setWindowVisible(false);
    } else if (action === "maximize") {
      maximized = !maximized;
      if (maximized) {
        restoredGeometry = mainWindow.getAttribute("style");
        mainWindow.removeAttribute("style");
      } else if (restoredGeometry) {
        mainWindow.setAttribute("style", restoredGeometry);
      }
      mainWindow.classList.toggle("maximized", maximized);
      actionButton.textContent = maximized ? "❐" : "□";
      actionButton.setAttribute("aria-label", maximized ? "Restore" : "Maximize");
    } else if (action === "close") {
      mainWindow.classList.add("closed");
      taskButton.classList.remove("active");
    } else if (action === "restore") {
      setWindowVisible(true);
    }
  }

  const browserButton = event.target.closest("[data-browser-action]");
  if (browserButton) {
    const action = browserButton.dataset.browserAction;
    if (action === "back") {
      window.history.back();
    } else if (action === "forward") {
      window.history.forward();
    } else if (action === "home") {
      navigateToPage("home");
    } else if (action === "contact") {
      navigateToPage("contact");
    } else if (action === "refresh") {
      window.location.reload();
    } else if (action === "stop") {
      window.stop();
    }
  }

  const menuButton = event.target.closest("[data-menu-action]");
  if (menuButton) {
    const action = menuButton.dataset.menuAction;
    action === "print" ? window.print() : navigateToPage(action);
  }

  const startItem = event.target.closest("[data-start-section]");
  if (startItem) {
    setWindowVisible(true);
    toggleStartMenu(false);
    navigateToPage(startItem.dataset.startSection);
  }

  if (!startMenu.hidden && !event.target.closest("#start-menu") && !event.target.closest("#start-button")) {
    toggleStartMenu(false);
  }
});

startButton.addEventListener("click", () => toggleStartMenu());

taskButton.addEventListener("click", () => {
  const isVisible = !mainWindow.classList.contains("minimized") && !mainWindow.classList.contains("closed");
  setWindowVisible(!isVisible);
});

addressForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const page = document.querySelector("#address").value.replace("portfolio://", "").replace(/[^a-z]/gi, "").toLowerCase();
  navigateToPage(page);
});

dragHandle.addEventListener("pointerdown", (event) => {
  if (maximized || event.target.closest("button") || window.innerWidth <= 680) return;

  const rect = mainWindow.getBoundingClientRect();
  mainWindow.style.right = "auto";
  mainWindow.style.bottom = "auto";
  mainWindow.style.width = `${rect.width}px`;
  mainWindow.style.height = `${rect.height}px`;
  mainWindow.style.left = `${rect.left}px`;
  mainWindow.style.top = `${rect.top}px`;
  dragState = { pointerId: event.pointerId, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
  dragHandle.setPointerCapture(event.pointerId);
});

dragHandle.addEventListener("pointermove", (event) => {
  if (!dragState || dragState.pointerId !== event.pointerId) return;

  const maxLeft = Math.max(0, window.innerWidth - mainWindow.offsetWidth);
  const maxTop = Math.max(0, window.innerHeight - 30 - mainWindow.offsetHeight);
  mainWindow.style.left = `${Math.min(maxLeft, Math.max(0, event.clientX - dragState.offsetX))}px`;
  mainWindow.style.top = `${Math.min(maxTop, Math.max(0, event.clientY - dragState.offsetY))}px`;
});

dragHandle.addEventListener("pointerup", (event) => {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  dragHandle.releasePointerCapture(event.pointerId);
  dragState = null;
});

document.querySelector("#shutdown").addEventListener("click", () => toggleStartMenu(false));

updateClock();
window.setInterval(updateClock, 1000);

const startupSound = new Audio("audio/windows-95-startup.mp3");
startupSound.preload = "auto";
startupSound.volume = 0.35;

async function playStartupSound() {
  try {
    startupSound.currentTime = 0;
    await startupSound.play();
    window.sessionStorage.setItem("portfolio-startup-played", "true");
  } catch {}
}

if (!window.sessionStorage.getItem("portfolio-startup-played")) {
  window.addEventListener("load", playStartupSound, { once: true });
}
