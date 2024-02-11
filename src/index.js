import './pages/index.css';
import './scripts/edit-popup';
import { initialCards } from './scripts/cards';

const cardTemplate = document.querySelector('#card-template').content;
const places = document.querySelector('.places__list');

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

for (const cardData of initialCards) {
  places.append(createCard(cardData, removeCard));
}
