import './pages/index.css';
import BigPicturePopup from './scripts/big-picture-popup';
import NewCardPopup from './scripts/new-card-popup';
import EditPopup from './scripts/edit-popup';
import { initialCards } from './scripts/cards';

const cardTemplate = document.querySelector('#card-template').content;
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
 * @function createCard
 * @description Создает новую карточку на основе переданных параметров.
 * @param {Object} cardData - Информация о карточке.
 * @param {Function} onDeleteCard - Колбек для удаления карточки.
 * @return {Object} Созданная карточка
 */
function createCard(cardData, onDeleteCard, onLikeCard, onPicture) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardText = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');

  cardText.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;

  cardImage.addEventListener('click', () => onPicture.call(bigPicturePopupInstance, cardData));
  cardDeleteButton.addEventListener('click', (event) => onDeleteCard(event.target.closest('.card')));
  cardLikeButton.addEventListener('click', (event) => onLikeCard(event.target.closest('.card__like-button')));

  return card;
}

/**
 * @function removeCard
 * @description Удаляет карточку, переданную в параметре.
 * @param {Object} cardElement - Карточка.
 */
function removeCard(cardElement) {
  cardElement.remove();
}

/**
 * @function likeCard
 * @description Переключает класс "card__like-button_is-active" на переданной карточке.
 * @param {Object} card - Карточка.
 */
function likeCard(card) {
  card.classList.toggle('card__like-button_is-active');
}

/**
 * @function handleCardAdded
 * @description Обработчик события "cardAdded". Добавляет новую карточку в начало списка.
 * @param {Object} cardData - Информация о карточке.
 */
function handleCardAdded(cardData) {
  places.prepend(createCard(cardData, removeCard, likeCard, bigPicturePopupInstance.onPictureClick));
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
  places.append(createCard(cardData, removeCard, likeCard, bigPicturePopupInstance.onPictureClick));
}
