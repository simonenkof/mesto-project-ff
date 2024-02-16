let currentModal;

/**
 * @function setupModalEventListeners
 * @description Настраивает слушателей событий модального окна.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function setupModalEventListeners(modal, closeButton) {
  modal.addEventListener('click', (event) => handlePopupClick(event, modal));
  closeButton.addEventListener('click', () => handleCloseButtonClick(modal));
}

/**
 * @function openModal
 * @description Открывает модальное окно.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function openModal(modal) {
  currentModal = modal;
  document.addEventListener('keydown', handleKeyDown);
  modal.classList.remove('popup_is-animated');
  modal.classList.add('popup_is-opened');
}

/**
 * @function closeModal
 * @description Закрывает модальное окно.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function closeModal(modal) {
  currentModal = modal;
  document.removeEventListener('keydown', handleKeyDown);
  modal.classList.remove('popup_is-opened');
  modal.classList.add('popup_is-animated');
}

/**
 * @function handleKeyDown
 * @description Обработчик события "keyDown" клавиатуры.
 * @param {Event} event - Событие.
 */
function handleKeyDown(event) {
  handleEscapeButtonClick(event, currentModal);
}

/**
 * @function handlePopupClick
 * @description Обработчик события "click" вне контейнера модального окна.
 * @param {Object} eventTarget - Инициатор события.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function handlePopupClick(event, modal) {
  if (event.target.classList.contains('popup')) closeModal(modal);
}

/**
 * @function handleEscapeButtonClick
 * @description Закрывает модальное окно, если была нажата клавиша Escape.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function handleEscapeButtonClick(event, modal) {
  if (event.key === 'Escape') closeModal(modal);
}

/**
 * @function handleCloseButtonClick
 * @description Обработчик события "click" кнопки закрытия модального окна.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function handleCloseButtonClick(modal) {
  closeModal(modal);
}

export { setupModalEventListeners, closeModal, openModal };
