
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
let mute = false
let moves = 0
let time = 0
let min = 0
let sec = 0

doh.volume = 0.5
woohoo.volume = 0.5
wintheme.volume = 0.5


// <----------------------- LISTENERS ----------------------->
// This listener will in voke a flip function when a card is clicked.
cards.forEach(card => card.addEventListener('click', flip))


// This listener will invoke a reload function to restart the game when the reset button clicked.
document.getElementById('reset').addEventListener('click', function(){
    location.reload()
})

// This listener will mute all game audio when the mute button is clicked.
document.getElementById('mute').addEventListener('click', function(){
        doh.volume = 0
        woohoo.volume = 0
        wintheme.volume = 0
})


// <----------------------- FUNCTIONS ----------------------->

function flip() {
    // This will return to end the function if the board is in a "frozen = true" status, which prevents any cards from being clicked while a unmatched pair is revealed on the board.
    if (frozen) return

    // This will return to end the function if the second clicked card has been marked as the first card.  This will prevent the player from being able to double-click a card and cause a bug where the event listener is removed before a second card is clicked.
    if (this === firstCard) return

    // This adds the "flipped" class to any clicked and flipped cards.
    this.classList.add('flipped')

    // This assigns whether card is the first or second to be flipped, while also increasing and displaying "moves" by one for each pair attempt made by the player
    if (!hasCardFlipped) {
        hasCardFlipped = true
        firstCard = this
        // This will start the game timer only when the clicked card is the first card the player has interacted with.
        if (moves === 0){
            startTimer() 
        }
    } else {
        moves++
        hasCardFlipped = false
        secondCard = this
        document.getElementById('moves').innerHTML = `Moves: ${moves}`
        checkMatch()
    }
}

// This will check to see if flipped cards match. If cards match, event listeners for those cards is removed so that the player can no longer interact with them.  The counter towards the win condition is increased by 1, a sound file is played to confirm there's been a match, and the reset function is called to reset the rest of the unmatched board to default variable values.  If there is not a match, the board enters a "frozen" status so that the player cannot interact with any additional cards while the unmatched pair are still flipped face-up on the board.  A sound file will be player to confirm this pair was not a match, and after one second the flipped class will be removed so that the cards return to a face-down position, and then gameplay can continue.
function checkMatch(){
    if (firstCard.dataset.char === secondCard.dataset.char){
        firstCard.removeEventListener('click', flip)
        secondCard.removeEventListener('click', flip)
        winCondition++
        reset()
        woohoo.play()
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

// This function will reset the board to default variable states when invoked.
function reset(){
    frozen = false
    hasCardFlipped = false
    firstCard = null
    secondCard = null
}

// This function assigns a random number 1-36 to each card and randomizes their order within the board div. Wrapping this function in parantheses cause it to become immediately invoked when the page is loaded, rather than havign to type out 'scramble()' elsewhere in the script.




//(function scramble(){
//     cards.forEach(card => {
//         let random = Math.floor(Math.random() * 36)
//         card.style.order = random
//     })
// })();

// This function starts the game timer when invoked, then displays it to the player.  The timer does not start until the player clicks their first card.
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

// This function is invoked when the player has matched all cards on the board.  It will clear the timer, while simultaneously displaying the final time and moves made by the player.  It will display a congratulations message that flashes using CSS.  It will also play a snippet of The Simpsons' theme song if the audio has not been muted.
function winner(){
    wintheme.play()
    clearInterval(interval)
    if (min === 0){
        document.getElementById('message').innerHTML = `<center><span id="grats">Congratulations!</span><br>You found everyone in:<br> ${sec} seconds with ${moves} moves!</center>`
    } else {
        document.getElementById('message').innerHTML = `<center><span   id="grats">Congratulations!</span><br>You found everyone in:<br> ${min}   minutes and ${sec} seconds with ${moves} moves!</center>`
    }
    document.getElementById('moves').innerHTML = ''
    document.getElementById('timer').innerHTML = ''
}

