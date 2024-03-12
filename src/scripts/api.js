const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '7332c102-5985-4106-8a4d-a272076739a4',
    'Content-Type': 'application/json',
  },
};

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

export const updateProfileData = async (profileData) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileData.name,
      about: profileData.about,
    }),
  }).catch((err) => console.log(err));
};

export const createCard = async (cardData) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).catch((err) => console.log(err));
};
