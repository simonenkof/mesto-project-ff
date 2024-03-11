const regex = /^(?:[a-zA-Zа-яА-Я\s-]*)$/;

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

function getValidationMessage(inputElement) {
  if (regex.test(inputElement.value)) {
    return inputElement.validationMessage;
  } else {
    return inputElement.dataset.errorMessage;
  }
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (
    inputElement.id !== 'popup__input_type_url' &&
    (!inputElement.validity.valid || !regex.test(inputElement.value))
  ) {
    showInputError(formElement, inputElement, getValidationMessage(inputElement), validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

// TODO: не работает валидация
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    if (inputElement.id === 'popup__input_type_url') {
      return !inputElement.validity.valid;
    } else {
      return !inputElement.validity.valid || !regex.test(inputElement.value);
    }
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
}

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  submitButtonElement.disabled = false;
  submitButtonElement.classList.remove(validationConfig.inactiveButtonClass);
}
