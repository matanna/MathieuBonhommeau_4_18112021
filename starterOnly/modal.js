class Player {
  constructor(firstName, lastName, email, birthdate, nbOfTournaments, location, conditions, newsletter) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._birthdate = birthdate;
    this._nbOfTournaments = nbOfTournaments;
    this.location = location;
    this.conditions = conditions;
    this.newsletter = newsletter;
  }

  get firstName() {
    return this._firstName;
  }
  set firstName(firstName) {
    if (firstName.length < 2) {
      throw 'Vous devez saisir au moins 2 caractères.';
    } else {
      this._firstName = firstName;
    }
  }

  get lastName() {
    return this._lastName;
  }
  set lastName(lastName) {
    if (lastName.length < 2) {
      throw 'Vous devez saisir au moins 2 caractères.';
    } else {
      this._lastName = lastName;
    }
  }

  get email() {
    return this._email;
  }
  set email(email) {
    const emailReg = new RegExp(/^([a-zA-Z0-9-.]{2,})@([a-zA-Z]+)\.[a-z]{2,4}/);
    if (!(emailReg.test(email))) {
      throw "Cette adresse n'est pas valide.";
    } else {
      this._email = email;
    }
  }
}

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
modalClose.addEventListener('click', closeModal);

//close modal form
function closeModal() {
  //The scrollbar is in position "absolute"
  document.documentElement.style.overflow = "overlay";

  //Retrieve delay of animation from css variable, remove the 's' and change number in millisecond
  const animationDuration = (getComputedStyle(modalContent).animationDuration.replace('s', '')) * 1000;

  //Add 2 class for bground and content for apply differents animations
  modalbg.classList.add("hide-bground");
  modalContent.classList.add("hide-content");
    
  //Apply a delay (animationDuration) for hide modal
  setTimeout(() => modalbg.style.display = "none", animationDuration);
}

//on submit form
reservationForm.addEventListener('submit', onReservationSubmit);

function onReservationSubmit(event) {
  event.preventDefault();

  let player = new Player();

  for (let i in reservationForm.elements) {
    try {
      player[reservationForm.elements[i].name] = reservationForm.elements[i].value;
      formElements[i].removeAttribute('data-error');
      formElements[i].removeAttribute('data-error-visible');
      console.log(player);

    } catch (error) {
      formElements[i].setAttribute('data-error', error);
      formElements[i].setAttribute('data-error-visible', true);
    }
    
  }

  console.log(player);
}

