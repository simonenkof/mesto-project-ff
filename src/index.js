import './pages/index.css';
import BigPicturePopup from './components/big-picture-modal';
import NewCardPopup from './components/new-card-modal';
import EditPopup from './components/edit-modal';
import { initialCards } from './scripts/cards';
import { createCard, removeCard, likeCard } from './components/card';

const places = document.querySelector('.places__list');
const bigPicturePopup = document.querySelector('.popup_type_image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const profileData = {
  name: profileTitle.textContent,
  job: profileJob.textContent,
};

const bigPicturePopupInstance = new BigPicturePopup(bigPicturePopup);
const newCardPopupInstance = new NewCardPopup(newCardPopup);
const editPopupInstance = new EditPopup(editPopup, profileData);

/**
 * @function setupEventListeners
 * @description Настраивает слушателей событий.
 */
function setupEventListeners() {
  document.addEventListener('cardAdded', (event) => handleCardAdded(event.detail.cardData));
  document.addEventListener('profileEdited', (event) => handleProfileEdited(event.detail));
  newCardButton.addEventListener('click', handleNewCardButtonClick);
  profileEditButton.addEventListener('click', handleEditButtonClick);
}

/**
 * @function handleCardAdded
 * @description Обработчик события "cardAdded". Добавляет новую карточку в начало списка.
 * @param {Object} cardData - Информация о карточке.
 */
function handleCardAdded(cardData) {
  places.prepend(
    createCard(cardData, removeCard, likeCard, bigPicturePopupInstance, bigPicturePopupInstance.onPictureClick)
  );
}

/**
 * @function handleProfileEdited
 * @description Обработчик события "profileEdited". Изменяет данные профиля.
 * @param {Object} profileData - Информация профиле.
 */
function handleProfileEdited(profileData) {
  profileTitle.textContent = profileData.name;
  profileJob.textContent = profileData.job;
}

/**
 * @function handleNewCardButtonClick
 * @description Обработчик события "click" кнопки добавления карточки. Открывает модальное окно
 * добавления карточки.
 */
function handleNewCardButtonClick() {
  newCardPopupInstance.clearInputs();
  newCardPopupInstance.openPopup();
}

/**
 * @function handleEditButtonClick
 * @description Обработчик события "click" кнопки редактирования профиля. Открывает модальное окно
 * редактирования профиля.
 */
function handleEditButtonClick() {
  editPopupInstance.openPopup();
}

setupEventListeners();

for (const cardData of initialCards) {
  places.append(
    createCard(cardData, removeCard, likeCard, bigPicturePopupInstance, bigPicturePopupInstance.onPictureClick)
  );
}
