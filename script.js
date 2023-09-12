//1. select word to guess
var isRunning = false;
//8. track wins/losses in localstorage
var wins = localStorage.getItem("wins");
if(wins==null){
    wins=0;
}
document.querySelector("#wins-span").textContent=wins;

var losses = localStorage.getItem("losses")||0;
document.querySelector("#losses-span").textContent=losses;
var playFieldEl = document.querySelector("#play-field");
var words = ["manatee", "jazz", "syzygy", "xylem", "giraffe"];
var randomWord ="";
var wordArr= [];
var userGuess = [];
var timeLeft = 10;
var timer;

function startGame() {
  timeLeft=10;
  randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);
  //2. display "_" for each letter in the word
  wordArr = randomWord.split("");
  console.log(wordArr);
   userGuess = [];
  for (let i = 0; i < wordArr.length; i++) {
    userGuess.push("_");
  }
  console.log("userGuess: ", userGuess);
  playFieldEl.textContent = userGuess.join(" ");
  isRunning=true;
  //6. track remaining time
  timer = setInterval(function(){
      timeLeft--;
      document.querySelector("#time-left").textContent = timeLeft;
      //7. if time runs out, loss
    if(timeLeft<=0){
        clearInterval(timer)
        losses++;
        localStorage.setItem("losses",losses);
        document.querySelector("#losses-span").textContent=losses;
        document.querySelector("#play-field").textContent=" You Lose 👎"
        isRunning=false;
    }
  },1000)
}
//3. when a user presses a key show that letter if in word
document.addEventListener("keyup", function (event) {
  if (!isRunning) {
    return;
  }
  var pressedKey = event.key;
  for (let i = 0; i < wordArr.length; i++) {
    console.log(wordArr[i], pressedKey);
    if (wordArr[i] === pressedKey) {
      console.log("same key!");
      userGuess[i] = pressedKey;
    }
    console.log(userGuess);
    playFieldEl.textContent = userGuess.join(" ");
    console.log("==============================");
  }
  //4. if all letters are showing, the user wins!
  if (userGuess.join("") === wordArr.join("")) {
    wins++;
    localStorage.setItem("wins",wins);
    document.querySelector("#wins-span").textContent=wins;
    document.querySelector("#play-field").textContent=" You Win ♥︎"
    isRunning=false;
    clearInterval(timer)
  }
});

document.querySelector("#start-btn").addEventListener("click",function(){
    //5. ensure game is only running after start button clicked
    if(!isRunning){
        startGame();
    }
})

//9. allow local storage reset.
document.querySelector("#reset").addEventListener("click",function(){
    localStorage.clear();
    losses=0;
    wins=0;
    document.querySelector("#wins-span").textContent=wins;
    document.querySelector("#losses-span").textContent=losses;
})
