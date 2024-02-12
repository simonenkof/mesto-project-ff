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

  changePopupDisplayState('flex');
}

/**
 * @function handlePopupClick
 * @description Обработчик события "click" вне контейнера модального окна.
 * @param {Object} eventTarget - Инициатор события.
 */
function handlePopupClick(event) {
  if (event.target.classList.contains('popup_type_image')) changePopupDisplayState('none');
}

/**
 * @function handleEscapeButtonClick
 * @description Обработчик события "keydown" клавиатуры. Закрывает модальное окно,
 * если была нажата клавиша Escape.
 */
function handleEscapeButtonClick(event) {
  if (event.key.toLowerCase() === 'escape') changePopupDisplayState('none');
}

/**
 * @function handleCloseButtonClick
 * @description Обработчик события "click" кнопки закрытия модального окна.
 */
function handleCloseButtonClick() {
  changePopupDisplayState('none');
}

/**
 * @function changePopupDisplayState
 * @description Изменяет отображение модального окна редактирования в зависимости
 * от переданного состояния.
 * @param {string} state - Состояние модального окна.
 */
function changePopupDisplayState(state) {
  if (state === 'none') {
    document.removeEventListener('keydown', handleEscapeButtonClick);
  } else {
    document.addEventListener('keydown', handleEscapeButtonClick);
  }

  bigPicturePopup.style.display = state;
}
