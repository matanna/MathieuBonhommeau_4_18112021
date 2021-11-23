import {Player} from './Player.js';

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const modalContent = document.querySelector(".content");
const reservationForm = document.getElementById("reservation");
const formElements = document.getElementsByClassName("formData");
const locations = document.querySelectorAll('.location');
const conditions = document.querySelectorAll('.conditions');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {

  //scroll is blocked when the modal is open
  document.documentElement.style.overflow = "hidden";
  modalbg.style.display = "block";
  
  //Remove class which are used to hide modal
  modalbg.classList.remove("hide-bground");
  modalContent.classList.remove("hide-content");
}

//close modal event
modalClose.addEventListener('click', function() {
  closeModalContent();
  closeModalBground();
});

//Add 2 class for bground and content for apply differents animations
const closeModalContent = () => { modalContent.classList.add("hide-content") };

function closeModalBground() {
  //The scrollbar is in position "absolute"
  document.documentElement.style.overflow = "overlay";

  //Retrieve delay of animation from css variable, remove the 's' and change number in millisecond
  const animationDuration = (getComputedStyle(modalContent).animationDuration.replace('s', '')) * 1000;

  modalbg.classList.add("hide-bground");
  setTimeout(() => modalbg.style.display = "none", animationDuration);
}

//on submit form
reservationForm.addEventListener('submit', onReservationSubmit);

function onReservationSubmit(event) {
  let nbErrors = 0;
  event.preventDefault();

  let player = new Player();

  for (let i=0; i < formElements.length; i++) {
    try {
      let formElement = formElements[i].getElementsByTagName('input');
      
      if (formElement[0].name === 'location') {
        player.location = getLocationValue();

      } else if (formElement[0].name === 'conditions') {
        player.termsAndConditions = conditions[0].checked;
        player.newsletter = conditions[1].checked;

      } else {
        player[formElement[0].name] = formElement[0].value;
      }
      formElements[i].removeAttribute('data-error');
      formElements[i].removeAttribute('data-error-visible');

    } catch (error) {
      nbErrors++;
      formElements[i].setAttribute('data-error', error);
      formElements[i].setAttribute('data-error-visible', true);
    }
  }

  if (nbErrors === 0) {
    reservation.reset();
  }
}

function getLocationValue() {
 
  let value = '';
  for (let location of locations) {
    if (location.checked) {
      value = location.value;
    }
  }
  return value;
}
