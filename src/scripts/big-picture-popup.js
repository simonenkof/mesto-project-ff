const bigPicturePopup = document.querySelector('.popup_type_image');
const closePopupButton = bigPicturePopup.querySelector('.popup__close');
const bigPictureImage = bigPicturePopup.querySelector('.popup__image');
const bigPictureCapture = bigPicturePopup.querySelector('.popup__caption');

setupEventListeners();

/**
 * @function setupEventListeners
 * @description Настраивает слушателей событий.
 */
function setupEventListeners() {
  bigPicturePopup.addEventListener('click', handlePopupClick);
  closePopupButton.addEventListener('click', handleCloseButtonClick);
}

/**
 * @function onPictureClick
 * @description Обработчик события "click" по изображению карточки. Открывает карточку.
 */
export function onPictureClick(cardData) {
  bigPictureImage.src = cardData.link;
  bigPictureCapture.textContent = cardData.name;

  openPopup();
}

/**
 * @function handlePopupClick
 * @description Обработчик события "click" вне контейнера модального окна.
 * @param {Object} eventTarget - Инициатор события.
 */
function handlePopupClick(event) {
  if (event.target.classList.contains('popup_type_image')) closePopup();
}

/**
 * @function handleEscapeButtonClick
 * @description Обработчик события "keydown" клавиатуры. Закрывает модальное окно,
 * если была нажата клавиша Escape.
 */
function handleEscapeButtonClick(event) {
  if (event.key.toLowerCase() === 'escape') closePopup();
}

/**
 * @function handleCloseButtonClick
 * @description Обработчик события "click" кнопки закрытия модального окна.
 */
function handleCloseButtonClick() {
  closePopup();
}

/**
 * @function openPopup
 * @description Открывает модальное окно.
 */
function openPopup() {
  document.addEventListener('keydown', handleEscapeButtonClick);
  bigPicturePopup.classList.remove('popup_is-animated');
  bigPicturePopup.classList.add('popup_is-opened');
}

/**
 * @function closePopup
 * @description Закрывает модальное окно.
 */
function closePopup() {
  document.removeEventListener('keydown', handleEscapeButtonClick);
  bigPicturePopup.classList.remove('popup_is-opened');
  bigPicturePopup.classList.add('popup_is-animated');
}
