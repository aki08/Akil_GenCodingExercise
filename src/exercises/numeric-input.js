/*
* Numeric Input Component
*   HTML (initial state): <input type="text" class="c-numeric-input" />
*   Requirement:
*   - should only accept numeric value only such as: 1, 1.2, -5, or 1000
*   - if user enters leading zero, or .  when user moves focus away from the input, it should
*     change to correct format:
*       .1 ==> 0.1 and 01 => 1
*   - if user enter invalid character/value, HTML should change to this
*       <input type="text" class="c-numeric-input c-numeric-input--error" />
*       <span class="c-numeric-input__error-msg">invalid input</span>
*   - if user enter valid value and move focus away from the input HTML should change to this:
*       <input type="text" class="c-numeric-input c-numeric-input--valid" />
*   - if user focus on the input or user clear value from the input,
*     HTML should return to initial stage
*
* Lastly, please add some css for c-numeric-input--error and c-numeric-input--valid to show
* red or green border to the input
* */

const NumericInput = {
  init: () => {
    document.querySelectorAll('.c-numeric-input').forEach(elem => {
      elem.addEventListener('focus', resetInputField);
      elem.addEventListener('blur', validateInput)
    });
  }
};
document.addEventListener('DOMContentLoaded', NumericInput.init);

function resetInputField(elem) {
  const input = elem.target;
  input.classList.remove('c-numeric-input--error', 'c-numeric-input--valid');
  removeError(input);
  input.value = '';
}

function validateInput(elem) {
  const input = elem.target;
  const inputValue = input.value.trim();

  if (inputValue !== '' && !isNaN(Number(inputValue))) {
    input.classList.remove('c-numeric-input--error');
    input.classList.add('c-numeric-input--valid');
  } else {
    input.classList.remove('c-numeric-input--valid');
    input.classList.add('c-numeric-input--error');
    input.value = '';
    displayError(input, 'Invalid input');
  }

  if (inputValue !== 0 && inputValue.startsWith('0') && ! inputValue.startsWith('0.')){
    input.value = inputValue.replace(/^0+/, '');
  }

  if(inputValue.startsWith('.')){
    input.value = '0' + inputValue;
  }

}

function displayError(input, message) {
  const errorMsg = document.createElement('span');
  errorMsg.className = 'c-numeric-input__error-msg';
  errorMsg.textContent = message;
  input.parentNode.appendChild(errorMsg);
}

function removeError(input) {
  const errorMsg = input.parentNode.querySelector('.c-numeric-input__error-msg');
  if (errorMsg) {
    errorMsg.parentNode.removeChild(errorMsg);
  }
}
