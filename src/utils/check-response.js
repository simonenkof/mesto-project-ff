/**
 * @function checkResponse
 * @description Проверяет успешность запроса к серверу.
 * @param {object} res - Ответ сервера.
 * @returns {Promise<Object>} Promise, которое возвращается в виде JSON-данных из ответа.
 * @throws {Error} Если статус ответа не OK.
 */
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};
