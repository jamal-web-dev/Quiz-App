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
      qustion: "What is a noun?",
      options: [
        "A noun is a name of Dog",
        "A noun means present happening",
        "A noun is a name of any person animal place or things",
        "Noun is the name of my friend"
      ],
      ans: "A noun is a name of any person animal place or things"
    },
    {
      qustion: "Nigeria is a ______",
      options: [
        "Country",
        "State",
        "City",
        "Village"
      ],
      ans: "Country"
    },
    {
      qustion: "What is 4 + 4",
      options: [
        "8",
        "7",
        "44",
        "9"
      ],
      ans: "8"
    },
    {
      qustion: "What is Ramadan",
      options: [
        "Month of Fasting",
        "Days of Prayer",
        "Days of Eating food",
        "For playing"
      ],
      ans: "Month of Fasting"
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
    clearInterval(timeInterval);
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





