export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.closePopupButton = popup.querySelector('.popup__close');

    this.setupEventListeners();
  }

  /**
   * @function setupEventListeners
   * @description Настраивает слушателей событий модального окна.
   */
  setupEventListeners() {
    this.popup.addEventListener('click', (event) => this.handlePopupClick(event));
    this.closePopupButton.addEventListener('click', () => this.handleCloseButtonClick());
  }

  /**
   * @function handlePopupClick
   * @description Обработчик события "click" вне контейнера модального окна.
   * @param {Object} eventTarget - Инициатор события.
   */
  handlePopupClick(event) {
    if (event.target.classList.contains('popup')) this.closePopup();
  }

  /**
   * @function handleEscapeButtonClick
   * @description Обработчик события "keydown" клавиатуры. Закрывает модальное окно,
   * если была нажата клавиша Escape.
   */
  handleEscapeButtonClick(event) {
    if (event.key.toLowerCase() === 'escape') this.closePopup();
  }

  /**
   * @function handleCloseButtonClick
   * @description Обработчик события "click" кнопки закрытия модального окна.
   */
  handleCloseButtonClick() {
    this.closePopup();
  }

  /**
   * @function openPopup
   * @description Открывает модальное окно.
   */
  openPopup() {
    document.addEventListener('keydown', (event) => this.handleEscapeButtonClick(event));
    this.popup.classList.remove('popup_is-animated');
    this.popup.classList.add('popup_is-opened');
  }

  /**
   * @function closePopup
   * @description Закрывает модальное окно.
   */
  closePopup() {
    document.removeEventListener('keydown', (event) => this.handleEscapeButtonClick(event));
    this.popup.classList.remove('popup_is-opened');
    this.popup.classList.add('popup_is-animated');
  }
}
