import Popup from './popup';
export default class BigPicturePopup extends Popup {
  constructor(popup) {
    super(popup);
    this.bigPictureImage = popup.querySelector('.popup__image');
    this.bigPictureCapture = popup.querySelector('.popup__caption');
  }

  /**
   * @function onPictureClick
   * @description Обработчик события "click" по изображению карточки. Открывает карточку.
   */
  onPictureClick(cardData) {
    this.bigPictureImage.src = cardData.link;
    this.bigPictureCapture.textContent = cardData.name;

    this.openPopup();
  }
}
