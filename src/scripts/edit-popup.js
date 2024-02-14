import Popup from './popup';
export default class EditPopup extends Popup {
  constructor(popup, profileData) {
    super(popup);
    this.popupForm = document.forms['edit-profile'];
    this.nameInput = this.popupForm.elements.name;
    this.jobInput = this.popupForm.elements.description;

    this.setupInputs(profileData);
    this.setupEvents();
  }

  /**
   * @function setupEvents
   * @description Настраивает слушателей событий.
   */
  setupEvents() {
    this.popupForm.addEventListener('submit', (event) => this.handleSaveButtonClick(event));
  }

  /**
   * @function setupInputs
   * @description Настраивает начальное значение в полях ввода.
   * @param {Object} profileData - Данные профиля.
   */
  setupInputs(profileData) {
    this.nameInput.value = profileData.name;
    this.jobInput.value = profileData.job;
  }

  /**
   * @function handleSaveButtonClick
   * @description Обработчик события "submit" кнопки сохранения изменений. Отменяет стандратное поведение события.
   * @param {Event} event - Событие.
   */
  handleSaveButtonClick(event) {
    event.preventDefault();
    this.saveEditedProfile();
    this.closePopup();
  }

  /**
   * @function saveEditedProfile
   * @description Генерирует событие "profileEdited" для обновления измененных данных.
   */
  saveEditedProfile() {
    document.dispatchEvent(
      new CustomEvent('profileEdited', {
        bubbles: true,
        detail: { name: this.nameInput.value, job: this.jobInput.value },
      })
    );
  }
}
