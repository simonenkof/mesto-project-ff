import { initialCards } from './cards';

const places = document.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const closePopupButton = newCardPopup.querySelector('.popup__close');
const newCardForm = document.forms['new-place'];
const cardNameInput = newCardForm.elements['place-name'];
const cardLinkInput = newCardForm.elements.link;

setupEventListeners();

/**
 * @function setupEventListeners
 * @description Настраивает слушателей событий.
 */
function setupEventListeners() {
  newCardPopup.addEventListener('click', handlePopupClick);
  newCardButton.addEventListener('click', handleNewCardClick);
  closePopupButton.addEventListener('click', handleCloseButtonClick);
  newCardForm.addEventListener('submit', handleSaveButtonClick);
}

function handleNewCardClick() {
  changePopupDisplayState('flex');
}

/**
 * @function handlePopupClick
 * @description Обработчик события "click" вне контейнера модального окна.
 * @param {Object} eventTarget - Инициатор события.
 */
function handlePopupClick(event) {
  if (event.target.classList.contains('popup_type_new-card')) changePopupDisplayState('none');
}

/**
 * @function handleCloseButtonClick
 * @description Обработчик события "click" кнопки закрытия модального окна.
 */
function handleCloseButtonClick() {
  changePopupDisplayState('none');
}

/**
 * @function handleEscapeButtonClick
 * @description Обработчик события "submit" кнопки сохранения изменений.
 * Отменяет стандратное поведение события.
 * @param {Event} event - Событие.
 */
function handleSaveButtonClick(event) {
  event.preventDefault();
  addNewCard();
  changePopupDisplayState('none');
}

/**
 * @function addNewCard
 * @description Создает новую карточку на основе введенных данных. Генерирует "cardAdded".
 */
function addNewCard() {
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    description: 'Новая карточка',
  };

  document.dispatchEvent(new CustomEvent('cardAdded', { detail: { cardData: card } }));
}

/**
 * @function changePopupDisplayState
 * @description Изменяет отображение модального окна редактирования в зависимости
 * от переданного состояния.
 * @param {string} state - Состояние модального окна.
 */
function changePopupDisplayState(state) {
  newCardPopup.style.display = state;
}
