import Popup from './modal';

export default class NewCardPopup extends Popup {
  constructor(popup) {
    super(popup);
    this.cardForm = document.forms['new-place'];
    this.cardNameInput = this.cardForm.elements['place-name'];
    this.cardLinkInput = this.cardForm.elements.link;

    this.setupEvents();
  }

  /**
   * @function setupEvents
   * @description Настраивает слушателей событий.
   */
  setupEvents() {
    this.cardForm.addEventListener('submit', (event) => this.handleSaveButtonClick(event));
  }

  /**
   * @function clearInputs
   * @description Очищает поля ввода.
   */
  clearInputs() {
    this.cardNameInput.value = '';
    this.cardLinkInput.value = '';
  }

  /**
   * @function handleEscapeButtonClick
   * @description Обработчик события "submit" кнопки сохранения изменений.
   * Отменяет стандратное поведение события.
   * @param {Event} event - Событие.
   */
  handleSaveButtonClick(event) {
    event.preventDefault();
    this.addNewCard();
    this.closePopup();
  }

  /**
   * @function addNewCard
   * @description Создает новую карточку на основе введенных данных. Генерирует "cardAdded".
   */
  addNewCard() {
    console.log('call');
    const card = {
      name: this.cardNameInput.value,
      link: this.cardLinkInput.value,
      description: 'Новая карточка',
    };

    document.dispatchEvent(new CustomEvent('cardAdded', { detail: { cardData: card } }));
  }
}
