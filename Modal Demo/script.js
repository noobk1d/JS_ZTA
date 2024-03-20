'use strict';

//Grabbing Elements
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let btnCloseModal = document.querySelector('.close-modal');
let btnsOpenModal = document.querySelectorAll('.show-modal');

//Actual Work

const openModal = function(){
   modal.classList.remove('hidden');
   overlay.classList.remove('hidden');
};

const closeModal = function () {
   modal.classList.add('hidden');
   overlay.classList.add('hidden');
 };

 for (let i = 0; i < btnsOpenModal.length; i++){
   console.log(btnsOpenModal[i]);
 btnsOpenModal[i].addEventListener('click', openModal);
 }
 
 btnCloseModal.addEventListener('click',closeModal);
 overlay.addEventListener('click', closeModal);

 //Esc Close
document.addEventListener('keydown', function(e){
   if(e.key === "Escape" && !modal.classList.contains('hidden')){ 
      closeModal();
   }
});
