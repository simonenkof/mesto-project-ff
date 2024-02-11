const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const editProfilePopup = document.querySelector('.popup_type_edit');
const closePopupButton = editProfilePopup.querySelector('.popup__close');
const editPopupForm = document.forms['edit-profile'];
const nameInput = editPopupForm.elements.name;
const jobInput = editPopupForm.elements.description;

setupEventListeners();

/**
 * @function setupEventListeners
 * @description Настраивает слушателей событий.
 */
function setupEventListeners() {
  editProfilePopup.addEventListener('click', handlePopupClick);
  profileEditButton.addEventListener('click', handleEditProfile);
  closePopupButton.addEventListener('click', handleCloseButtonClick);
  editPopupForm.addEventListener('submit', handleSaveButtonClick);
}

/**
 * @function handleEditProfile
 * @description Обработчик события "click" кнопки редактирования профиля. Открывает модальное окно
 * редактирования профиля.
 */
function handleEditProfile() {
  const profileInfo = {
    name: profileTitle.textContent,
    description: profileJob.textContent,
  };

  openEditPopup(profileInfo);
}

/**
 * @function handlePopupClick
 * @description Обработчик события "click" вне контейнера модального окна.
 * @param {Object} eventTarget - Инициатор события.
 */
function handlePopupClick(event) {
  if (event.target.classList.contains('popup_type_edit')) changePopupDisplayState('none');
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
 * @description Обработчик события "keydown" клавиатуры. Закрывает модальное окно,
 * если была нажата клавиша Escape.
 */
function handleEscapeButtonClick(event) {
  if (event.key.toLowerCase() === 'escape') changePopupDisplayState('none');
}

/**
 * @function handleEscapeButtonClick
 * @description Обработчик события "submit" кнопки сохранения изменений.
 * Отменяет стандратное поведение события.
 * @param {Event} event - Событие.
 */
function handleSaveButtonClick(event) {
  event.preventDefault();
  saveEditedProfile();
  changePopupDisplayState('none');
}

/**
 * @function saveEditedProfile
 * @description
 */
function saveEditedProfile() {
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

/**
 * @function openEditPopup
 * @description Открывает модальное окно редактирования профиля.
 * @param {Object} profileInfo - Информация о профиле.
 */
function openEditPopup(profileInfo) {
  changePopupDisplayState('flex');

  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.description;
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

  editProfilePopup.style.display = state;
}
