/**
 * @function renderLoading
 * @description Управляет отображением загрузки.
 * @param {HTMLButtonElement} button - Кнопка, на которой нужно отобразить загрузку.
 * @param {boolean} state - Флаг загрузки.
 */
export const renderLoading = (button, state) => {
  button.textContent = state ? 'Сохранение...' : 'Сохранить';
};
