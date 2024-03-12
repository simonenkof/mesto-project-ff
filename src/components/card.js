import * as api from '../scripts/api';

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

  if (cardData.liked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => onPicture(cardData));
  cardDeleteButton.addEventListener('click', (event) => onDeleteCard(event.target.closest('.card'), cardData['_id']));
  cardLikeButton.addEventListener('click', () => onLikeCard(card, cardData['_id']));

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
  api.deleteCard(cardId);
  cardElement.remove();
}

/**
 * @function likeCard
 * @description Переключает класс "card__like-button_is-active" на переданной карточке.
 * @param {Object} card - Карточка.
 */
function likeCard(card, cardId) {
  const cardButton = card.querySelector('.card__like-button');
  const cardLikes = card.querySelector('.card__like-count');

  if (cardButton.classList.contains('card__like-button_is-active')) {
    cardButton.classList.remove('card__like-button_is-active');

    api
      .dislikeCard(cardId)
      .then((res) => res.likes.length)
      .then((likes) => {
        cardLikes.textContent = likes;
      });
  } else {
    cardButton.classList.add('card__like-button_is-active');

    api
      .likeCard(cardId)
      .then((res) => res.likes.length)
      .then((likes) => {
        cardLikes.textContent = likes;
      });
  }
}

export { createCard, removeCard, likeCard };
