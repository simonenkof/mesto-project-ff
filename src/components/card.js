/**
 * @function createCard
 * @description Создает новую карточку на основе переданных параметров.
 * @param {Object} cardData - Информация о карточке.
 * @param {Function} onDeleteCard - Колбек для удаления карточки.
 * @return {Object} Созданная карточка
 */
function createCard(cardData, onDeleteCard, onLikeCard) {
  const card = getCardTemplate();
  const cardText = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');

  cardText.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;

  cardImage.addEventListener('click', () => handleOnPictureClick(cardImage.src, cardText.textContent));
  cardDeleteButton.addEventListener('click', (event) => onDeleteCard(event.target.closest('.card')));
  cardLikeButton.addEventListener('click', (event) => onLikeCard(event.target.closest('.card__like-button')));

  return card;
}

/**
 * @function handleOnPictureClick
 * @description Обработчик события "click" на изображение карточки. Генерирует событие "onPictureClick".
 * @param {string} imageLink - Ссылка на изображение.
 */
function handleOnPictureClick(imageLink, imageCaption) {
  document.dispatchEvent(
    new CustomEvent('onPictureClick', { bubbles: true, detail: { imageLink: imageLink, imageCaption: imageCaption } })
  );
}

/**
 * @function getCardTemplate
 * @description Возвращает шаблон картчки.
 * @return {HTMLLIElement} Шаблон карточки.
 */
function getCardTemplate() {
  const cardTemplate = document.querySelector('#card-template').content;
  return cardTemplate.querySelector('.card').cloneNode(true);
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

export { createCard, removeCard, likeCard };
