const cardTemplate = document.querySelector("#card-template").content;
const places = document.querySelector(".places__list");

function createCard(text, imagePath, removeButtonFunction) {
    const card = cardTemplate.querySelector(".card").cloneNode(true);
    const cardText = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const removeButton = card.querySelector(".card__delete-button");

    cardText.textContent = text;
    cardImage.src = imagePath;

    removeButton.addEventListener("click", (event) => removeButtonFunction(event.target.parentNode));

    return card;
}

function removeCard(eventTarget) {
    eventTarget.remove();
}

for (const card of initialCards) {
    places.append(createCard(card.name, card.link, removeCard));
}
