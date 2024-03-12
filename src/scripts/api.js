const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '7332c102-5985-4106-8a4d-a272076739a4',
    'Content-Type': 'application/json',
  },
};

/**
 * @function getUserInfo
 * @async
 * @description Получает информацию о пользователе с сервера.
 * @returns {Promise<object>} Promise, который возвращается с информацией о пользователе.
 * @throws {string} Сообщение об ошибке в случае неудачи запроса.
 */
export const getUserInfo = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

/**
 * @function getCards
 * @async
 * @description Получает информацию о карточках.
 * @returns {Promise<object>} Promise, который возвращается с информацией о карточках.
 * @throws {string} Сообщение об ошибке в случае неудачи запроса.
 */
export const getCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

/**
 * @function updateProfileData
 * @async
 * @description Обновляет данные профиля.
 * @param {object} profileData - Данные профиля.
 * @returns {Promise<object>} Promise, который возвращается с информацией о профиле.
 * @throws {string} Сообщение об ошибке в случае неудачи запроса.
 */
export const updateProfileData = async (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileData.name,
      about: profileData.about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};

/**
 * @function createCard
 * @async
 * @description Создает новую карточку.
 * @param {object} cardData - Данные карточки.
 * @returns {Promise<object>} Promise, который возвращается с информацией о созданной карточке.
 * @throws {string} Сообщение об ошибке в случае неудачи запроса.
 */
export const createCard = async (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};

/**
 * @function deleteCard
 * @async
 * @description Удаляет карточку по id.
 * @param {string} cardId - id карточки.
 * @throws {string} Сообщение об ошибке в случае неудачи запроса.
 */
export const deleteCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

/**
 * @function likeCard
 * @async
 * @description Ставит лайк на карточку по id.
 * @param {string} cardId - id карточки.
 * @returns {Promise<object>} Promise, который возвращается с информацией о лайкнутой карточке.
 * @throws {string} Сообщение об ошибке в случае неудачи запроса.
 */
export const likeCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};

/**
 * @function dislikeCard
 * @async
 * @description Убирает лайк с карточки по id.
 * @param {string} cardId - id карточки.
 * @returns {Promise<object>} Promise, который возвращается с информацией о дизлайкнутой карточке.
 * @throws {string} Сообщение об ошибке в случае неудачи запроса.
 */
export const dislikeCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};

/**
 * @function updateUserAvatar
 * @async
 * @description Обновляет аватар пользователя.
 * @param {string} avatarLink - Ссылка на аватар.
 * @returns {Promise<object>} Promise, который возвращается с информацией о профиле.
 * @throws {string} Сообщение об ошибке в случае неудачи запроса.
 */
export const updateUserAvatar = async (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};
