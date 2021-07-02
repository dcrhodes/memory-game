
// <----------------------- CONSTANTS ----------------------->
const cards = document.querySelectorAll('.all-cards')


// <----------------------- VARIABLES ----------------------->
let hasCardFlipped = false 
let frozen = false
let firstCard, secondCard




// <----------------------- LISTENERS ----------------------->
cards.forEach(card => card.addEventListener('click', flip))





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

    // checks to see if flipped cards match. removes flipped class so that they cannot be turned back over
    if (firstCard.dataset.char === secondCard.dataset.char){
        firstCard.removeEventListener('click', flip)
        secondCard.removeEventListener('click', flip)
        //resets the board to default variable states after cards are revealed that don't match.
        frozen = false
        hasCardFlipped = false
        firstCard = null
        secondCard = null
    } else {
        frozen = true
        setTimeout(() => {
            firstCard.classList.remove('flipped')
            secondCard.classList.remove('flipped')
            //resets the board to default variable states after cards are revealed that don't match.
            frozen = false
            hasCardFlipped = false
            firstCard = null
            secondCard = null
        }, 1000);
    }
    }
}