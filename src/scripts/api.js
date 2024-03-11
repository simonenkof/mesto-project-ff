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
