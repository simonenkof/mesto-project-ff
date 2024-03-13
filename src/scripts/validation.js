/**
 * @function showInputError
 * @description Показывает сообщение об ошибке валидации.
 * @param {HTMLFormElement} formElement - Элемент формы.
 * @param {HTMLInputElement} inputElement - Поле ввода.
 * @param {string} errorMessage - Сообщение об ошибке.
 * @param {object} validationConfig - Настройки валидации.
 */
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}

/**
 * @function hideInputError
 * @description Скрывает сообщение об ошибке валидации.
 * @param {HTMLFormElement} formElement - Элемент формы.
 * @param {HTMLInputElement} inputElement - Поле ввода.
 * @param {object} validationConfig - Настройки валидации.
 */
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

/**
 * @function getValidationMessage
 * @description Возвращает текст сообщения валидации.
 * @param {HTMLInputElement} inputElement - Поле ввода.
 * @return {string} Текст сообщения валидации
 */
function getValidationMessage(inputElement) {
  if (!inputElement.validity.patternMismatch) {
    return inputElement.validationMessage;
  } else {
    return inputElement.dataset.errorMessage;
  }
}

/**
 * @function checkInputValidity
 * @description Проверяет валидность полей ввода в форме.
 * @param {HTMLFormElement} formElement - Элемент формы.
 * @param {HTMLInputElement} inputElement - Поле ввода.
 * @param {object} validationConfig - Настройки валидации.
 */
function checkInputValidity(formElement, inputElement, validationConfig) {
  if (!inputElement.validity.valid || inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, getValidationMessage(inputElement), validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

/**
 * @function hasInvalidInput
 * @description Проверяет валидность полей ввода.
 * @param {HTMLInputElement[]} inputList - Массив полей ввода.
 * @returns {boolean} Валидность полей ввода.
 */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid || inputElement.validity.patternMismatch);
}

/**
 * @function toggleButtonState
 * @description Изменять доступность кнопки сохранения в зависимости от валидности полей ввода.
 * @param {HTMLInputElement[]} inputList - Массив полей ввода.
 * @param {HTMLButtonElement} buttonElement - Кнопка сохранения.
 * @param {string} inactiveButtonClass - CSS класс заблокированной кнопки.
 */
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

/**
 * @function setEventListeners
 * @description Устанавливает слушателей событий для полей ввода в форме.
 * @param {HTMLFormElement} formElement - Элемент формы.
 * @param {object} validationConfig - Настройки валидации.
 */
function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
}

/**
 * @function enableValidation
 * @description Включает валидацию полей ввода на всех формах.
 * @param {object} validationConfig - Настройки валидации.
 */
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
}

/**
 * @function clearValidation
 * @description Очищает валидацию на форме.
 * @param {HTMLFormElement} formElement - Элемент формы.
 * @param {object} validationConfig - Настройки валидации.
 */
export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  submitButtonElement.disabled = false;
  submitButtonElement.classList.remove(validationConfig.inactiveButtonClass);
}
