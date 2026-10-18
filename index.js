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
  function showTime(){
   
   document.getElementById("time-display").innerText=`${currDate.toLocaleString()}`;
 }
 
 
/* GreetUser Display */


 function greetUser(name){
   const username = userInput.value;
   document.getElementById("user-input");
   let hour = currDate.getHours();
   
   if (!username == "" && hour <=12) { 
     greetDisplay.innerText =`Good morning ${username}, Welcome to Greeting Master App.`; 
   }
   
    else if (!username == "" && hour <=14){
     greetDisplay.innerText=`Good afternoon ${username}, Welcome to Greeting Master App.`;
   }
   
   else if (!username == "" && hour >14){ greetDisplay.innerText=`Good evening ${username}, Welcome to Greeting Master App.`;}
   else { greetDisplay.innerText="Invalid Name"; 
   }
   } 
   greetBtn.addEventListener("click", greetUser);
   
 
 function toggleTheme(){ 
     appContainer = NaN;
   if (appContainer == NaN){
     appContainer.classList.remove("app-container");
     appContainer.classList.add("dark-mode");
   }
   };
 toggleBtn.addEventListener("click", toggleTheme);
 
 
 
 
 