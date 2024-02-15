import './pages/index.css';
import * as baseModal from './components/modal';
import { initialCards } from './scripts/cards';
import { createCard, removeCard, likeCard } from './components/card';

const places = document.querySelector('.places__list');
const bigPictureModal = document.querySelector('.popup_type_image');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');

const profileEditButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('.popup_type_edit');
const editModalForm = document.forms['edit-profile'];
const editingName = editModalForm.elements.name;
const editingJob = editModalForm.elements.description;

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const profileData = {
  name: profileName.textContent,
  job: profileJob.textContent,
};

/**
 * @function setupEditModalInputs
 * @description Настраивает слушателей событий модального окна и его элементов.
 * @param {HTMLDivElement} inputsData
 */
function setupEditModal(inputsData) {
  editingName.value = inputsData.name;
  editingJob.value = inputsData.job;
  editModalForm.addEventListener('submit', handleProfileEdited);
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
 * @function setupEventListeners
 * @description Настраивает слушателей событий.
 */
function setupEventListeners() {
  document.addEventListener('cardAdded', (event) => handleCardAdded(event.detail.cardData));
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
function handleProfileEdited(event) {
  event.preventDefault();

  const profileData = {
    name: editingName.value,
    job: editingJob.value,
  };

  updateProfile(profileData);
  baseModal.closeModal(editModal);
}

/**
 * @function updateProfile
 * @description Обновляет данные профиля.
 * @param {Object} profileData - Новые данные профиля.
 */
function updateProfile(profileData) {
  profileName.textContent = profileData.name;
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
  baseModal.openModal(editModal);
}

function handleOnPictureClick() {}

setupEventListeners();
setupEditModal(profileData);

for (const modal of [bigPictureModal, newCardModal, editModal]) {
  setupModal(modal);
}

for (const cardData of initialCards) {
  places.append(createCard(cardData, removeCard, likeCard, handleOnPictureClick));
}
