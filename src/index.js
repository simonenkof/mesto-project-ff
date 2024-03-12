import './pages/index.css';
import * as baseModal from './components/modal';
import { createCard, removeCard, likeCard } from './components/card';
import { enableValidation, clearValidation } from './scripts/validation';
import { getUserInfo, getCards, updateProfileData } from './scripts/api';

const places = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const pofileAvatar = document.querySelector('.profile__image');

const bigPictureModal = document.querySelector('.popup_type_image');
const imageBigPictureModal = bigPictureModal.querySelector('.popup__image');
const captionBigPictureModal = bigPictureModal.querySelector('.popup__caption');

const newCardButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];
const newCardNameInput = newCardForm.elements['place-name'];
const newCardLinkInput = newCardForm.elements.link;

const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const formEditModal = document.forms['edit-profile'];
const nameInput = formEditModal.elements.name;
const jobInput = formEditModal.elements.description;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

/**
 * @function setupEventListeners
 * @description Настраивает слушателей событий.
 */
function setupEventListeners() {
  newCardButton.addEventListener('click', handleNewCardButtonClick);
  profileEditButton.addEventListener('click', handleEditButtonClick);
}

/**
 * @function setupModal
 * @description Настраивает слушателей событий модального окна и его элементов.
 * @param {HTMLDivElement} modal - Модальное окно.
 */
function setupModal(modal) {
  const closeButton = modal.querySelector('.popup__close');
  baseModal.setupModalEventListeners(modal, closeButton);
}

/**
 * @function setupBigPictureModal
 * @description Настраивает модальное окно с увеличенным изображением.
 * @param {Object} imageData - Информация об изображении.
 */
function setupBigPictureModal(imageData) {
  imageBigPictureModal.src = imageData.link;
  imageBigPictureModal.alt = imageData.description;
  captionBigPictureModal.textContent = imageData.name;
}

/**
 * @function onPictureClick
 * @description Открывает модальное окно с увеличенным изображением.
 * @param {Object} cardData - Информация о карточке.
 */
function onPictureClick(cardData) {
  setupBigPictureModal(cardData);
  baseModal.openModal(bigPictureModal);
}

/**
 * @function setupNewCardPopup
 * @description Настраивает модальное окно добавления новой карточки.
 */
function setupNewCardPopup() {
  newCardForm.addEventListener('submit', handleAddCard);
}

/**
 * @function handleNewCardButtonClick
 * @description Обработчик события "click" кнопки добавления карточки. Открывает модальное окно
 * добавления карточки.
 */
function handleNewCardButtonClick() {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  baseModal.openModal(newCardModal);
}

/**
 * @function handleAddCard
 * @description Обработчик события "submit" формы добавления новой карточки.
 * Считывает данные формы и передает их для создания новой карточки.
 * @param {Event} event - Событие "submit".
 */
function handleAddCard(event) {
  event.preventDefault();

  const newCardData = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };

  addCard(newCardData);
  baseModal.closeModal(newCardModal);
}

/**
 * @function addCard
 * @description Обработчик события "cardAdded". Добавляет новую карточку в начало списка.
 * @param {Object} cardData - Информация о карточке.
 */
function addCard(cardData) {
  places.prepend(createCard(cardData, removeCard, likeCard, onPictureClick));
}

/**
 * @function setupEditModalInputs
 * @description Настраивает слушателей событий модального окна и его элементов.
 */
function setupEditModal() {
  formEditModal.addEventListener('submit', handleProfileEdited);
}

/**
 * @function handleEditButtonClick
 * @description Обработчик события "click" кнопки редактирования профиля. Открывает модальное окно
 * редактирования профиля.
 */
function handleEditButtonClick() {
  const profileData = {
    name: profileName.textContent,
    job: profileJob.textContent,
  };

  setupProfileData(profileData);
  clearValidation(editProfileModal, validationConfig);
  baseModal.openModal(editProfileModal);
}

/**
 * @function setupProfileData
 * @description Устанавливает значения полей ввода в окне редактирования профиля.
 * @param {Object} inputsData - Обновленные данные профиля.
 */
function setupProfileData(inputsData) {
  nameInput.value = inputsData.name;
  jobInput.value = inputsData.job;
}

/**
 * @function handleProfileEdited
 * @description Обработчик события "profileEdited". Изменяет данные профиля.
 * @param {Event} event - Событие.
 */
function handleProfileEdited(event) {
  event.preventDefault();

  const profileData = {
    name: nameInput.value,
    about: jobInput.value,
  };

  updateProfileData(profileData);
  updateProfile(profileData);
  baseModal.closeModal(editProfileModal);
}

/**
 * @function updateProfile
 * @description Обновляет данные профиля.
 * @param {Object} profileData - Новые данные профиля.
 */
function updateProfile(profileData) {
  profileName.textContent = profileData.name;
  profileJob.textContent = profileData.about;

  if (profileData.avatar) {
    pofileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
  }
}

setupEventListeners();
setupEditModal();
setupNewCardPopup();
enableValidation(validationConfig);

const profileData = async () => {
  const data = await getUserInfo();
  return { name: data.name, about: data.about, avatar: data.avatar };
};

updateProfile(await profileData());

for (const modal of [bigPictureModal, newCardModal, editProfileModal]) {
  setupModal(modal);
}

Promise.all([getCards(), getUserInfo()]).then((res) => {
  res[0].forEach((card) => {
    places.append(createCard(card, removeCard, likeCard, onPictureClick));
  });
});
