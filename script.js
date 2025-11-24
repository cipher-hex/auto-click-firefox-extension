// Counter starts at 0 on page load/refresh
let counter = 0;

const counterDisplay = document.getElementById("counter");
const clickbutton = document.getElementById("clickbutton");

// Update counter display
function updateDisplay() {
  counterDisplay.textContent = counter;

  // Add animation class
  counterDisplay.classList.add("updated");

  // Remove animation class after animation completes
  setTimeout(() => {
    counterDisplay.classList.remove("updated");
  }, 200);
}

// Increment counter on button click
clickbutton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// Initialize display on page load
updateDisplay();

// Popup functionality
// Popup is created dynamically - NOT in DOM at start
let popupOverlay = null;
let closeButton = null;
let testButton = null;
let colorIndex = 0;
let popupTimer = null;
let isPopupOpen = false;

// Configurable delay in milliseconds (10000 = 10 seconds)
const POPUP_DELAY = 15000;

const colorSchemes = [
  { bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", text: "#333" },
  { bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", text: "#fee140" },
  { bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", text: "#fa709a" },
  { bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", text: "#764ba2" },
  { bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", text: "#333" },
  { bg: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)", text: "#fee140" },
];

// Function to create popup dynamically
function createPopup() {
  // Create overlay
  popupOverlay = document.createElement("div");
  popupOverlay.className = "popup-overlay";
  popupOverlay.id = "popupOverlay";

  // Create popup content
  const popupContent = document.createElement("div");
  popupContent.className = "popup-content";

  // Create close button
  closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.id = "closeButton";
  closeButton.innerHTML = "&times;";

  // Create test button
  testButton = document.createElement("button");
  testButton.className = "test-button";
  testButton.textContent = "Accept";

  // Assemble popup
  popupContent.appendChild(closeButton);
  popupContent.appendChild(testButton);
  popupOverlay.appendChild(popupContent);

  // Add to body
  document.body.appendChild(popupOverlay);

  // Attach event listeners
  closeButton.addEventListener("click", hidePopup);
  testButton.addEventListener("click", () => {
    colorIndex = (colorIndex + 1) % colorSchemes.length;
    const scheme = colorSchemes[colorIndex];
    document.body.style.background = scheme.bg;
    document.querySelector("h1").style.color = scheme.text;
  });

  // Show popup with animation
  setTimeout(() => {
    popupOverlay.classList.add("show");
  }, 10);
}

// Function to show popup (creates it if doesn't exist)
function showPopup() {
  if (!isPopupOpen) {
    if (!popupOverlay) {
      createPopup();
    } else {
      popupOverlay.classList.add("show");
    }
    isPopupOpen = true;
  }
}

// Function to hide popup
function hidePopup() {
  if (popupOverlay) {
    isPopupOpen = false;
    popupOverlay.classList.remove("show");

    // Remove popup from DOM after animation
    setTimeout(() => {
      if (popupOverlay && popupOverlay.parentNode) {
        popupOverlay.remove();
        popupOverlay = null;
        closeButton = null;
        testButton = null;
      }
    }, 300); // Match CSS transition duration

    // Clear any existing timer
    if (popupTimer) {
      clearTimeout(popupTimer);
    }

    // Show popup again after delay
    popupTimer = setTimeout(() => {
      showPopup();
    }, POPUP_DELAY);
  }
}

// Create and show popup after delay on page load
setTimeout(() => {
  showPopup();
}, POPUP_DELAY);
