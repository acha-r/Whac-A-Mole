const squares = document.querySelectorAll('.square')  //.name is used when the query selector (empahsis on query selector) is picking a class. #name is used ID
const mole = document.querySelector('.mole')  //querySelector is for picking css styles
const timeLeft = document.querySelector('#time-left')  //we can also use "document.getElementById". We wont be needing the #sign. Eg: document.getElementById('time-left')
const score = document.getElementById('score')
const start = document.getElementById('start')
const reset = document.getElementById('reset')

console.log(timeLeft.innerHTML, "time")
let result = 0
let hitPosition
let currentTime = +(timeLeft.innerHTML)
let initialTime = +(timeLeft.innerHTML);
let timerId = null
let countDownTimerId
let state = "initial"

console.log(state, "initialstate")
function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole') //classList is a built in property
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]  //the calculation generates a random index from array of squares. length of squares is 9
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id

}

//when you click a square to catch the mole
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            score.innerHTML = result //instead of .innerHTML, you could also use .textContent
            hitPosition = null
        }
    })
})

start.addEventListener("click", moveMole => {   //
    console.log(state,"state start")
    if (state != "isClicked") {
        state = "isClicked"
        timerId = setInterval(randomSquare, 500)
        countDownTimerId = setInterval(countDown, 1000)        
    }
    console.log(state,"state end")

})

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
  
    if (currentTime == 0) {
        clearInterval(countDownTimerId);  //clearInterval is built in
        clearInterval(timerId);
        alert("TIME UP! You earned " + result + " points");
        state = "initial"
        resetGame()
    }
}

reset.addEventListener('click', resetGame)

function resetGame() {
    //Stop interval from running
    clearInterval(countDownTimerId) 
    clearInterval(timerId)

    //Reassign values to their initial values
    result = 0
    score.textContent = result 
    timeLeft.textContent = initialTime
    state = "initial";
    currentTime = +(timeLeft.innerHTML);

}

//Initial set state to initial
//when user clicks on button we will set state to is clicked
//When time runs out we will set state back to initial


