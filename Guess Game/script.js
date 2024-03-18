'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1; // Generate a random number between  1 and 20
console.log(secretNumber);
let score  = 20;
let highScore = 0;

let displayMessage =  function (message) {
   document.querySelector( '.message' ).textContent = message;
};

document.querySelector('.check').addEventListener('click',function(){
   let userGuess = Number(document.querySelector('.guess').value);

   if(!userGuess){
      displayMessage('⛔️ No number!');
   }else if(userGuess == secretNumber){
      displayMessage('🎉 Correct Number!');
      document.querySelector('.number').textContent = secretNumber;
  
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      if(score > highScore){
         highScore = score;
         document.querySelector('.highscore').textContent = highScore;
      }
   }else if(userGuess != secretNumber){
      if(score > 1){
         displayMessage(userGuess > secretNumber ? '📈 Too high!' : '📉 Too low!');
         score--;
         document.querySelector('.score').textContent = score;
      }else{
         displayMessage('💥 You lost the game!');
         document.querySelector('.score').textContent = 0;
      }
   }
});

//Again Feature
document.querySelector('.again').addEventListener('click',function(){
   secretNumber = Math.trunc(Math.random() * 20) + 1;
   score = 20;
   displayMessage('Start guessing...');
   document.querySelector('.score').textContent = score;
   document.querySelector('.number').textContent = '?';
   document.querySelector('.guess').value = '';
 
   document.querySelector('body').style.backgroundColor = '#222';
   document.querySelector('.number').style.width = '15rem';
});