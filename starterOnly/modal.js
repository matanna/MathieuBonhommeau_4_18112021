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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.documentElement.style.overflow = "hidden";
  modalbg.classList.remove("hide-bground");
  modalContent.classList.remove("hide-content");
}

//close modal event
modalClose.addEventListener('click', closeModal);

//close modal form
function closeModal() {
  document.documentElement.style.overflow = "overlay";

  //Retrieve delay of animation from css variable, remove the 's' and change number in millisecond
  const animationDuration = (getComputedStyle(modalContent).animationDuration.replace('s', '')) * 1000;

  //Add 2 class for bground and content for apply differents animations
  modalbg.classList.add("hide-bground");
  modalContent.classList.add("hide-content");
    
  //Apply a delay (animationDuration) for hide modal
  setTimeout(() => modalbg.style.display = "none", animationDuration);
}

