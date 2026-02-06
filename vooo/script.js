const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const namePage = document.getElementById("namePage");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const crushName = document.getElementById("crushName");

// Start Button (Name Submit)
startBtn.addEventListener("click", () => {
  let name = nameInput.value.trim();

  if (name === "") {
    alert("Please enter a name 😅");
    return;
  }

  crushName.innerText = name;

  namePage.classList.add("hidden");
  page1.classList.remove("hidden");
});

// NO button escape effect
noBtn.addEventListener("mouseover", () => {
  moveButton();
});

noBtn.addEventListener("click", () => {
  moveButton();
});

function moveButton() {
  const container = document.querySelector(".container");

  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  let newX = Math.random() * (containerRect.width - btnRect.width);
  let newY = Math.random() * (containerRect.height - btnRect.height);

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
  noBtn.style.right = "auto";
  noBtn.style.bottom = "auto";
  noBtn.style.position = "absolute";
}

// YES button click show page2
yesBtn.addEventListener("click", () => {
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
});
