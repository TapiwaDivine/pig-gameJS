/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores , roundScore, activePlayer, gamePlaying;

init();

var lastDice
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = <em> + dice + </em>;

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        
        // onclick wee need a random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // display results
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        
        if(dice === 6 && lastDice === 6){
            // player loses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer()
        } else if(dice !== 1){    // Update the round score if the number is not 1
        
            // add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            // next player
        nextPlayer()
            // document.querySelector('.player-0-panel').classList.remove('active');
            // document.querySelector('.player-1-panel').classList.add('active');
        }
        lastDice = dice
    }
    

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
        //  add current score to global score
        /* activePlayer variable has 2 value 0 & 1 so scores is an array of 2 values so the first
        value which has a index of 0 will collect scores from actiplayer 0 and also to the activeplayer 1's score will be recorded on the 1 index position in the array from the roundScore
        */ 
        scores[activePlayer] += roundScore;
        // update the the score if player holds
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        if(input) {
            winningScore = input;
        }else{
            winningScore = 100
        }

        // check if player won the game
        if(scores[activePlayer] >= winningScore){
            // the player has passed the required score  then
            // change their name from player1/2 to winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // hide the  dice
            document.querySelector('.dice').style.display = 'none'
            // then we remove the active class and replace it with the winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false
        }else{
            // change player
            nextPlayer()
        }

    }
})

// function to change to the next player
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
// roundscore display
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
// changing the player active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// function to reset game
document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    // setting all scores to zero
    gamePlaying = true
    scores = [0,0];
    roundScore = 0;
    // setting starting player to be player 0 who is also player one
    activePlayer = 0;

    // hiding the dice which we need to display when the roll is clicked
    document.querySelector('.dice').style.display = 'none';
    //ensuring the scores display is zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    // setting the current score to zero
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // setting player names are displyed as player 1 & player 2
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // removing the winner class to restart the game
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')

    //removing the active class from player 2 when the game is restarted 
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    // setting active to player 1
    document.querySelector('.player-0-panel').classList.add('active')
    
}
