/**
 * Class for create a Player object with setters for validate datas. A valid player can be registered for competitions
 * 
 * @module MyClass
 */
export class Player {
  /**
   * @param {string} firstName 
   * @param {string} lastName 
   * @param {string} email 
   * @param {datetime} birthdate 
   * @param {number} nbOfTournaments 
   * @param {string} location 
   * @param {boolean} termsAndConditions 
   * @param {boolean} newsletter 
   */
  constructor(firstName, lastName, email, birthdate, nbOfTournaments, location, termsAndConditions, newsletter) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this.birthdate = birthdate;
    this._nbOfTournaments = nbOfTournaments;
    this._location = location;
    this._termsAndConditions = termsAndConditions;
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

  get nbOfTournaments() {
    return this._nbOfTournaments;
  }
  set nbOfTournaments(nbOfTournaments) {
    const numReg = new RegExp(/^[0-9]+$/);
    
    if (!(numReg.test(nbOfTournaments))) {
      throw 'Vous devez saisir un nombre.';
    
    } else if (parseInt(nbOfTournaments) < 0 || parseInt(nbOfTournaments) > 99){
      throw 'Vous devez saisir un chiffre entre 0 et 99.';
    
    } else {
      this._nbOfTournaments = parseInt(nbOfTournaments);
    }
  }

  get location() {
    return this._location;
  }
  set location(location) {
    if (!location) {
      throw 'Vous devez spécifier une ville.';
    
    } else {
      this._location = location;
    }
  }

  get termsAndConditions() {
    return this._termsAndConditions;
  }
  set termsAndConditions(termsAndConditions) {
      if (!termsAndConditions) {
        throw 'Les conditions générales doivent êtres acceptées.';

      } else {
        return this._termsAndConditions; 
      } 
  }
}