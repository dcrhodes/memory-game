
// <----------------------- CONSTANTS ----------------------->
const cards = document.querySelectorAll('.all-cards')


// <----------------------- VARIABLES ----------------------->
let hasCardFlipped = false 
let frozen = false
let firstCard, secondCard
let doh = new Audio('/sounds/doh.mp3')
let woohoo = new Audio('/sounds/woohoo.mp3')



// <----------------------- LISTENERS ----------------------->
cards.forEach(card => card.addEventListener('click', flip))

//this listener invokes a reload function to refresh the page when clicked
document.getElementById('reset').addEventListener('click', function(){
    location.reload()
})
document.getElementById('mute').addEventListener('click', function(){
    doh = new Audio('/sounds/doh.mp3').muted
    woohoo = new Audio('/sounds/woohoo.mp3').muted
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
    } else {
        hasCardFlipped = false
        secondCard = this

    // checks to see if flipped cards match. removes event listener so that they cannot be turned back over
    if (firstCard.dataset.char === secondCard.dataset.char){
        firstCard.removeEventListener('click', flip)
        secondCard.removeEventListener('click', flip)
        // testing rollout animation
        // firstCard.classList.add('animate__rollOut')
        // secondCard.classList.add('animate__rollOut')
        //
        woohoo.play()
        reset()
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
(function scramble(){
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 36)
        card.style.order = random
    })
})();