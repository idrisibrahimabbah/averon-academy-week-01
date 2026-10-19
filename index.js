let appContainer = document.getElementById("app-container");

const h3Elem = document.querySelector("#time-display");

const showTimeBtn = document.getElementById("show-time");

const greetDisplay = document.querySelector("#greeting-display");

const userInput = document.getElementById("user-input");

const greetBtn = document.getElementById("greet-btn");

const toggleBtn = document.querySelector("#bg-toggle");

//showTimeBtn.addEventListener("click", showTime);

let currDate = new Date();

/* Current Time Display */

function showTime() {
  document.getElementById("time-display").innerText =
    `${currDate.toLocaleString()}`;
}

/* GreetUser Display */

function greetUser(name) {
  const username = userInput.value;

  document.getElementById("user-input");

  let hour = currDate.getHours();

  if (!username == "" && hour <= 12) {
    greetDisplay.innerText = `Good morning ${username}, Welcome to Greeting Master App.`;
    userInput.value = "";
  }

   else if (!username == "" && hour <= 14) {
    greetDisplay.innerText = `Good afternoon ${username}, Welcome to Greeting Master App.`;
    userInput.value = "";
  }
  
  else if (!username == "" && hour > 14) {
    greetDisplay.innerText = `Good evening ${username}, Welcome to Greeting Master App.`;
    userInput.value = "";
  }
    
  else {
    greetDisplay.innerText = "Invalid Name";
    greetDisplay.style.color = "red";
    userInput.value = "";
  }
}
greetBtn.addEventListener("click", greetUser);

function toggleTheme() {
  if (!appContainer === false) {
    appContainer.classList.toggle("dark-mode");
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => { button.style.backgroundColor = "teal";

    })
  }
}
toggleBtn.addEventListener("click", toggleTheme);
