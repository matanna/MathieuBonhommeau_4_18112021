/**
 * Class for build a confirm modal
 */
export class ConfirmBox {
    /**
     * @param {string} content 
     * @param {string} buttonText 
     */
    constructor(title, content, buttonText) {
        this.title = title;
        this.content = content;
        this.buttonText = buttonText;
    }

    /**
     * Method for build the modal html which will after injected in document
     * 
     * @returns {string} HTML string repesent the modal
     */
    build() {
        const confirmationBox = document.createElement('div');
        confirmationBox.classList.add('confirm');
        confirmationBox.innerHTML = 
            `<div class='confirm-msg'> 
                ${this.createTitle().outerHTML} 
                ${this.createBody().outerHTML} 
            </div> 
            ${this.createButton().outerHTML}`
        return confirmationBox;
    }

    /**
     * Create title of the confirmation modal 
     *
     * @returns {HTML object}
     */
    createTitle() {
        const confirmationTitle = document.createElement('h3');
        confirmationTitle.classList.add('confirm-title');
        confirmationTitle.innerText = this.title;
        return confirmationTitle;
    }

    /**
     * Create body of the confirmation modal 
     *
     * @returns {HTML object}
     */
    createBody() {
        const confirmationContent = document.createElement('p');
        confirmationContent.classList.add('confirm-body');
        confirmationContent.innerText = this.content;
        return confirmationContent;
    }

    /**
     * Create button of the confirmation modal 
     *
     * @returns {HTML object}
     */
    createButton() {
        const confirmationBtn = document.createElement('button');
        confirmationBtn.classList.add('btn-submit', 'confirm-btn');
        confirmationBtn.setAttribute('type', 'button');
        confirmationBtn.innerText = this.buttonText;
        return confirmationBtn;
    }
}