import { deleteCard } from '../scripts/api';

/**
 * @function createCard
 * @description Создает новую карточку на основе переданных параметров.
 * @param {Object} cardData - Информация о карточке.
 * @param {Function} onDeleteCard - Колбек для удаления карточки.
 * @return {Object} Созданная карточка
 */
function createCard(cardData, onDeleteCard, onLikeCard, onPicture) {
  const card = getCardTemplate();
  const cardText = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikes = card.querySelector('.card__like-count');

  cardText.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;
  cardLikes.textContent = cardData.likes.length;

  cardDeleteButton.style.display = cardData.userOwner ? 'block' : 'none';

  cardImage.addEventListener('click', () => onPicture(cardData));
  cardDeleteButton.addEventListener('click', (event) => onDeleteCard(event.target.closest('.card'), cardData['_id']));
  cardLikeButton.addEventListener('click', (event) => onLikeCard(event.target.closest('.card__like-button')));

  return card;
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
function removeCard(cardElement, cardId) {
  deleteCard(cardId);
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
