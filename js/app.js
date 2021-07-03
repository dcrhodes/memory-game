
// <----------------------- CONSTANTS ----------------------->
const cards = document.querySelectorAll('.all-cards')


// <----------------------- VARIABLES ----------------------->
let hasCardFlipped = false 
let winCondition = 0
let frozen = false
let firstCard, secondCard
let doh = new Audio('/sounds/doh.mp3')
let woohoo = new Audio('/sounds/woohoo.mp3')
let wintheme = new Audio('/sounds/wintheme.mp3')
let moves = 0
let time = 0
let min = 0
let sec = 0


// <----------------------- LISTENERS ----------------------->
//this listener
cards.forEach(card => card.addEventListener('click', flip))


//this listener invokes a reload function to refresh the page when clicked
document.getElementById('reset').addEventListener('click', function(){
    location.reload()
})

// detach into separate function
document.getElementById('mute').addEventListener('click', function(){
    doh = new Audio('/sounds/doh.mp3').muted
    woohoo = new Audio('/sounds/woohoo.mp3').muted
    wintheme = new Audio('/sounds/wintheme.mp3').muted
})

// <----------------------- FUNCTIONS ----------------------->
function flip() {
    //returns to the end the function if the board is in a "frozen = true" status, which prevents any cards from being clicked while a unmatched pair is revealed on the board.
    if (frozen) return

   

    //returns to end the function if the second clicked card has been marked as the first card.  this prevents being able to double-click a card and cause a bug where the event listener is removed before a second card is clicked.
    if (this === firstCard) return
    //adds tne "flipped" class to the clicked cards.
    this.classList.add('flipped')
    // assigns whether card is first or second to be flipped.
    if (!hasCardFlipped) {
        hasCardFlipped = true
        firstCard = this
        if (moves === 0){
            startTimer() 
        }
        
    } else {
        moves++
        hasCardFlipped = false
        secondCard = this
        //increases "moves" by one for each pair attempt made by the player.
        
        document.getElementById('moves').innerHTML = `Moves: ${moves}`


    // checks to see if flipped cards match. removes event listener so that they cannot be turned back over
    if (firstCard.dataset.char === secondCard.dataset.char){
        firstCard.removeEventListener('click', flip)
        secondCard.removeEventListener('click', flip)
        woohoo.play()
        winCondition++
        reset()
        if (winCondition === 18){
            winner()
        }
    } else {
        frozen = true
        setTimeout(() => {
            doh.play()    
        }, 300);
        
        setTimeout(() => {
            firstCard.classList.remove('flipped')
            secondCard.classList.remove('flipped')
            reset()
        }, 1000);
    }
    }
}

//resets the board to default variable states when called.
function reset(){
    frozen = false
    hasCardFlipped = false
    firstCard = null
    secondCard = null
}

//this function assigns a number 1-36 to each card and randomizes their order within the board div.  wrapping this function in parantheses cause it to become immediately invoked when the page is loaded

// (function scramble(){
//     cards.forEach(card => {
//         let random = Math.floor(Math.random() * 36)
//         card.style.order = random
//     })
// })();


function startTimer(){
    interval = setInterval(() => {
        document.getElementById('timer').innerHTML = `Time: ${min}:${sec}`
        sec++
        
        if (sec < 10){
            document.getElementById('timer').innerHTML = `Time: ${min}:0${sec}`
        } else {
            document.getElementById('timer').innerHTML = `Time: ${min}:${sec}`
        }

        if (sec >= 60){
            sec = 0
            min++
        }
    }, 1000);
}



function winner(){
    wintheme.play()
    clearInterval(interval)

    document.getElementById('message').innerHTML = `<center><span id="grats">Congratulations!</span><br>You found everyone in:<br> ${min} minutes and ${sec} seconds with ${moves} moves!</center>`
    
    document.getElementById('moves').innerHTML = ''
    document.getElementById('timer').innerHTML = ''
}