/**
 * This file manage the inscription form modal in GameOn homepage
 */

import {Player} from './Player.js';
import {ConfirmBox} from './ConfirmBox.js';

/**
 * Display menu in terms of screen size
 * 
 * @return {void}
 */
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/* DOM Elements ============================================================================================ */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close");
const modalContent = document.querySelector(".content");
const reservationForm = document.getElementById("reservation");
const modalBody = document.querySelector('.modal-body');
const formElements = document.getElementsByClassName("formData");
const locations = document.querySelectorAll('.location');
const conditions = document.querySelectorAll('.conditions');

//Retrieve delay of animation from css variable, remove the 's' and change number in millisecond
const animationDuration = (getComputedStyle(modalContent).animationDuration.replace('s', '')) * 1000;

/* Events on the page ======================================================================================= */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

modalClose.addEventListener('click', function() {
  closeModalContent();
  closeModalBground();
});

reservationForm.addEventListener('submit', onReservationSubmit);

/* Functions ================================================================================================ */

/**
 * Function for launch modal form
 * 
 * @returns {void}
 */
function launchModal() {

  window.scrollTo(0, 0);

  //Cancel the height of modal if is necessary
  modalBody.style.height = 'inherit';

  //scroll is blocked when the modal is open
  document.documentElement.style.overflow = "hidden";
  modalbg.style.display = "block";
  
  //Remove class which are used to hide modal
  modalbg.classList.remove("hide-bground");
  modalContent.classList.remove("hide-content");
}

/**
 * Add a class in content modal for apply animations when we close it
 * 
 * @returns {void}
 */
const closeModalContent = () => { modalContent.classList.add("hide-content") };

/**
 * Add a class in bground modal for apply animations when we close it
 * Apply a delay for leave time to see content modal animation
 * 
 * @returns {void}
 */
function closeModalBground() {
  document.documentElement.style.overflow = "auto";

  modalbg.classList.add("hide-bground");
  setTimeout(() => modalbg.style.display = "none", animationDuration);
}

/**
 * Retrieve inscription form datas
 * Create a valid Player object
 * The validation of datas is done in the Player class
 * 
 * @param {event} event 
 * @returns {void}
 */
function onReservationSubmit(event) {

  let nbErrors = 0;
  event.preventDefault();

  let player = new Player();

  //Browse all form elements for create the Player
  for (let i=0; i < formElements.length; i++) {
    
    //Check datas in a try - catch
    try {
      let formElement = formElements[i].getElementsByTagName('input');
      
      //Process for location radio buttons
      if (formElement[0].name === 'location') {
        player.location = getLocationValue();

      //Process for conditions checkbox buttons
      } else if (formElement[0].name === 'conditions') {
        player.termsAndConditions = conditions[0].checked;
        player.newsletter = conditions[1].checked;

      } else {
        player[formElement[0].name] = formElement[0].value;
      }

      //If data-error attribute is present, remove it
      formElements[i].removeAttribute('data-error');
      formElements[i].removeAttribute('data-error-visible');

    } catch (error) {

      //Count number of errors
      nbErrors++;

      //Add data-error attribute on affected element with message
      formElements[i].setAttribute('data-error', error);
      formElements[i].setAttribute('data-error-visible', true);
    }
  }

  //If no error : form is valid. Reset form field, close form modal and open confirmation modal
  if (nbErrors === 0) {
    reservation.reset();
    confirmationModal(player);
  }
}

/**
 * Browse all locations elements and retrieve the one which is checked if there is one
 * 
 * @returns {string} The name of location
 */
function getLocationValue() {
 
  let value = '';
  for (let location of locations) {
    if (location.checked) {
      value = location.value;
    }
  }
  return value;
}

/**
 * Display confirmation modal when the form is valid
 * 
 * @param {Player} player 
 */
function confirmationModal(player) {

  //Get original height of the form modal
  let modalHeight = modalBody.offsetHeight;

  //Create an object ConfirmBox with message
  let confirmBox = new ConfirmBox(
    `Merci ${player.firstName} pour votre inscription !`,
    `Un mail de confirmation vous a été envoyé à l'adresse suivante : \n \n ${player.email}`,
    `Fermer`
  ).build();
  
  //Replace form by confirm div with message
  modalBody.replaceChild(confirmBox, reservationForm);

  //Give correct height at confirmation modal
  modalBody.style.height = modalHeight + 'px';
  
  //Event for close confirmation modal
  document.querySelector('.confirm-btn').addEventListener('click', () => {
    
    modalContent.classList.add("hide-content");

    //When close, replace form modal in its place
    setTimeout(() => modalBody.replaceChild(reservationForm, confirmBox), animationDuration);
    closeModalBground();
  });
}


