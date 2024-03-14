import './pages/index.css';
import * as baseModal from './components/modal';
import { createCard, removeCard, likeCard } from './components/card';
import { enableValidation, clearValidation } from './scripts/validation';
import { renderLoading } from './utils/render-loading';
import * as api from './scripts/api';

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
const saveButtonNewCardModal = newCardForm.elements['save-button'];

const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const formEditModal = document.forms['edit-profile'];
const nameInput = formEditModal.elements.name;
const jobInput = formEditModal.elements.description;
const saveButtonEditProfile = formEditModal.elements['save-button'];

const profileAvatarEditButton = document.querySelector('.profile__image-container');
const profileAvatarModal = document.querySelector('.popup_type_edit-avatar');
const profleAvatarForm = document.forms['profile-avatar'];
const avatarLinkInput = profleAvatarForm.elements.link;
const saveButtonAvatarEdit = profleAvatarForm.elements['save-button'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

let userId = '';

/**
 * @function setupEventListeners
 * @description Настраивает слушателей событий.
 */
function setupEventListeners() {
  newCardButton.addEventListener('click', handleNewCardButtonClick);
  profileEditButton.addEventListener('click', handleEditButtonClick);
  profileAvatarEditButton.addEventListener('click', handleEditAvatarButtonClick);
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
 * @function setupNewCardFormSubmit
 * @description Настраивает модальное окно добавления новой карточки.
 */
function setupNewCardFormSubmit() {
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

  renderLoading(saveButtonNewCardModal, true);

  const newCardData = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };

  api
    .createCard(newCardData)
    .then((res) => {
      res.userOwner = res.owner['_id'] === userId;
      addCard(res, userId);
      baseModal.closeModal(newCardModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(saveButtonNewCardModal, false);
    });
}

/**
 * @function addCard
 * @description Обработчик события "cardAdded". Добавляет новую карточку в начало списка.
 * @param {Object} cardData - Информация о карточке.
 */
function addCard(cardData, userId) {
  places.prepend(createCard(cardData, userId, removeCard, likeCard, onPictureClick));
}

/**
 * @function setupEditProfileFormSubmitInputs
 * @description Настраивает слушателей событий модального окна и его элементов.
 */
function setupEditProfileFormSubmit() {
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

  renderLoading(saveButtonEditProfile, true);

  const profileData = {
    name: nameInput.value,
    about: jobInput.value,
  };

  api
    .updateProfileData(profileData)
    .then((res) => {
      updateProfile({ name: res.name, about: res.about });
      baseModal.closeModal(editProfileModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(saveButtonEditProfile, false);
    });
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

/**
 * @function setupEditProfileFormSubmitInputs
 * @description Настраивает слушателей событий модального окна и его элементов.
 */
function setupProfileAvatarFormSubmit() {
  profileAvatarModal.addEventListener('submit', handleProfileAvatarEdited);
}

/**
 * @function handleAvatarButtonClick
 * @description Обработчик события "click" кнопки редактирования аватара профиля. Открывает модальное окно
 * редактирования аватара профиля.
 */
function handleEditAvatarButtonClick() {
  profleAvatarForm.reset();
  clearValidation(profleAvatarForm, validationConfig);
  baseModal.openModal(profileAvatarModal);
}

/**
 * @function handleProfileAvatarEdited
 * @description Обработчик события "profileEdited". Изменяет данные профиля.
 * @param {Event} event - Событие.
 */
function handleProfileAvatarEdited(event) {
  event.preventDefault();

  renderLoading(saveButtonAvatarEdit, true);

  api
    .updateUserAvatar(avatarLinkInput.value)
    .then((res) => res.avatar)
    .then((avatar) => {
      pofileAvatar.style.backgroundImage = `url(${avatar})`;
      baseModal.closeModal(profileAvatarModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(saveButtonAvatarEdit, false);
    });
}

setupEventListeners();
setupEditProfileFormSubmit();
setupNewCardFormSubmit();
setupProfileAvatarFormSubmit();
enableValidation(validationConfig);

for (const modal of [bigPictureModal, newCardModal, editProfileModal, profileAvatarModal]) {
  baseModal.setupModal(modal);
}

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    cards.forEach((cardData) => {
      updateProfile(userData);
      userId = userData['_id'];
      cardData.userOwner = cardData.owner['_id'] === userId;
      places.append(createCard(cardData, userId, removeCard, likeCard, onPictureClick));
    });
  })
  .catch((err) => console.log(err));
