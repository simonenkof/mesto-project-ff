/**
 * @function setupModal
 * @description Настраивает слушателей событий модального окна и его элементов.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function setupModal(modal) {
  const closeButton = modal.querySelector('.popup__close');
  setupModalEventListeners(modal, closeButton);
}

/**
 * @function setupModalEventListeners
 * @description Настраивает слушателей событий модального окна.
 * @param {HTMLDivElement} modal - Модальное окно.
 * @param {HTMLButtonElement} closeButton - Кнопка закрытия модального окна.
 */
function setupModalEventListeners(modal, closeButton) {
  modal.addEventListener('mousedown', handlePopupClick);
  closeButton.addEventListener('click', handleCloseButtonClick);
}

/**
 * @function openModal
 * @description Открывает модальное окно.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function openModal(modal) {
  document.addEventListener('keydown', handleEscapeButtonClick);
  modal.classList.add('popup_is-opened');
}

/**
 * @function closeModal
 * @description Закрывает модальное окно.
 */
function closeModal(modal) {
  document.removeEventListener('keydown', handleEscapeButtonClick);
  modal.classList.remove('popup_is-opened');
}

/**
 * @function handlePopupClick
 * @description Обработчик события "click" вне контейнера модального окна.
 * @param {Event} event - Событие.
 */
function handlePopupClick(event) {
  if (event.target.classList.contains('popup')) closeModal(event.target);
}

/**
 * @function handleEscapeButtonClick
 * @description Закрывает модальное окно, если была нажата клавиша Escape.
 * @param {Event} event - Событие.
 */
function handleEscapeButtonClick(event) {
  if (event.key === 'Escape') closeModal(getOpenedModal());
}

/**
 * @function handleCloseButtonClick
 * @description Обработчик события "click" кнопки закрытия модального окна.
 */
function handleCloseButtonClick() {
  closeModal(getOpenedModal());
}

/**
 * @function getOpenedModal
 * @description Возвращает открытое модальное окно.
 * @return {HTMLDivElement} Открытое модальное окно
 */
function getOpenedModal() {
  return document.querySelector('.popup_is-opened');
}

export { setupModal, setupModalEventListeners, closeModal, openModal };
