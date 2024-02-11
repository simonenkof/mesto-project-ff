import './pages/index.css';
import './scripts/edit-popup';
import './scripts/new-card-popup';
import { initialCards } from './scripts/cards';

const cardTemplate = document.querySelector('#card-template').content;
const places = document.querySelector('.places__list');

document.addEventListener('cardAdded', (event) => handleCardAdded(event.detail.cardData));

function createCard(cardData, onDeleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardText = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');

  cardText.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;

  cardDeleteButton.addEventListener('click', (event) => onDeleteCard(event.target.closest('.card')));

  return card;
}

function removeCard(cardElement) {
  cardElement.remove();
}

/**
 * @function handleCardAdded
 * @description Обработчик события "cardAdded". Добавляет новую карточку в начало списка.
 * @param {Object} cardData - Информация о карточке.
 */
function handleCardAdded(cardData) {
  places.prepend(createCard(cardData, removeCard));
}

for (const cardData of initialCards) {
  places.append(createCard(cardData, removeCard));
}
