const startButton = document.querySelector(".start");
const startScreen = document.querySelector(".start-screen");
const quizScreen = document.querySelector(".quiz-screen");
const resultScreen = document.querySelector(".result-screen");

startButton.addEventListener("click", ()=>{
    showQuestion();
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    startTime();
})


// SAVING QUESTIONS IN ARRAY:
const questions = [
  {
    qustion: "Which planet is known as the Red Planet?",
    options: [
      "Earth",
      "Mars",
      "Venus",
      "Jupiter"
    ],
    ans: "Mars"
  },
  {
    qustion: "What is the capital city of Nigeria?",
    options: [
      "Lagos",
      "Abuja",
      "Kano",
      "Ibadan"
    ],
    ans: "Abuja"
  },
  {
    qustion: "Which language runs in the browser for web pages?",
    options: [
      "Python",
      "Java",
      "JavaScript",
      "C++"
    ],
    ans: "JavaScript"
  },
  {
    qustion: "How many days are there in a leap year?",
    options: [
      "365",
      "366",
      "364",
      "360"
    ],
    ans: "366"
  },
  {
    qustion: "Which gas do humans need to breathe to survive?",
    options: [
      "Carbon dioxide",
      "Oxygen",
      "Nitrogen",
      "Hydrogen"
    ],
    ans: "Oxygen"
  },
  {
    qustion: "What is the result of 9 × 7?",
    options: [
      "63",
      "56",
      "72",
      "49"
    ],
    ans: "63"
  },
  {
    qustion: "Which ocean is the largest in the world?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean"
    ],
    ans: "Pacific Ocean"
  },
  {
    qustion: "What device is used to measure temperature?",
    options: [
      "Barometer",
      "Thermometer",
      "Speedometer",
      "Altimeter"
    ],
    ans: "Thermometer"
  },
  {
    qustion: "Which continent is Nigeria located in?",
    options: [
      "Asia",
      "Europe",
      "Africa",
      "South America"
    ],
    ans: "Africa"
  },
  {
    qustion: "Which part of the computer is considered the brain?",
    options: [
      "Hard Drive",
      "RAM",
      "CPU",
      "Monitor"
    ],
    ans: "CPU"
  }
];

// RENDERING QUESTIONS FROM QUESTIONS ARRAY
const questionsNumber = document.querySelector(".currentNumber");
const questionstTotalNumber = document.querySelector(".totalNumber");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

questionstTotalNumber.innerHTML = questions.length;

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

function showQuestion(){
  const currentQuestion = questions[currentQuestionIndex];

  const question = document.querySelector(".question");
  question.textContent = currentQuestion.qustion;

  const ansBox = document.querySelector(".answer-box");
  ansBox.innerHTML = "";

  currentQuestion.options.forEach((option)=>{
    const optionHtml =`
      <li class="">
        <input type="radio">
        ${option}
      </li>
    `;
    ansBox.innerHTML += optionHtml;
  })

  // Choosing An Option At a Time
  const  options = document.querySelectorAll(".answer-box li");

  options.forEach((option)=>{
      option.addEventListener("click",(e)=>{
          options.forEach(op =>{
              op.classList.remove("choose");
              op.querySelector("input").checked = false;
          })
          option.classList.add("choose");
          option.querySelector("input").checked = true;

          const selectedAnswer = option.textContent.trim();
          userAnswers[currentQuestionIndex] = selectedAnswer;
          // console.log(selectedAnswer, userAnswers[currentQuestionIndex]);

      })
  })
 


  if(currentQuestionIndex === questions.length - 1){
    nextButton.textContent = "Submit";
    // clearInterval(timeInterval);
    // timerElement.innerText = "00";
  } else{
    nextButton.textContent = "Next";
  }

  const savedAnswer = userAnswers[currentQuestionIndex];

  if(savedAnswer){
    options.forEach(option=>{
        if(option.textContent.trim() === savedAnswer){
            option.classList.add("choose");
            option.querySelector("input").checked = true;
        }
    })
  }

}

showQuestion();

let currentQuestionsNumber = currentQuestionIndex + 1;
questionsNumber.innerHTML = currentQuestionsNumber;

function showNextQuestion(){
  if(currentQuestionIndex === questions.length - 1){
    calculateScore();
    quizScreen.style.display = "none";
    resultScreen.style.display = "flex";
    return;
  }
  currentQuestionIndex++;
  showQuestion();
  questionsNumber.innerHTML = currentQuestionIndex + 1;
}
function showPrevQuestion(){
  if(currentQuestionIndex > 0){
    currentQuestionIndex--;
    showQuestion();
    questionsNumber.innerHTML = currentQuestionIndex + 1;
  }
}
// SETTING TIMER 
const timerElement = document.querySelector(".timer");

let timeLeft = 60 // seconds
let timeInterval;

function startTime(){
  timeInterval = setInterval(()=>{
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerElement.innerText = `${minutes}:${seconds}`;
    timeLeft--;
    if(timeLeft < 0){
      clearInterval(timeInterval);
      calculateScore();
      quizScreen.style.display = "none";
      resultScreen.style.display = "block";
    }

  },1000)
}

nextButton.addEventListener("click", ()=>{
   showNextQuestion(); 
})
prevButton.addEventListener("click", ()=>{
  showPrevQuestion();
})

function calculateScore(){

  let score = 0;

  questions.forEach((question,index)=>{
      if(userAnswers[index] === question.ans){
          score++;
      }
  });

  const scoreBox = document.querySelector(".result-circle").innerHTML = `
    <span>${score}</span>/ <span>${questions.length}</span>
    `;
}

const restartButton = document.querySelector(".restart");

restartButton.addEventListener("click", ()=>{
  window.location.reload();
})





