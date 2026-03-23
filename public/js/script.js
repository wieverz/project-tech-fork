document.addEventListener('DOMContentLoaded', () => {
  const rangeInput = document.getElementById('experience');
  const displayValue = document.getElementById('val');

  if (rangeInput && displayValue) {
      rangeInput.addEventListener('input', () => {
          displayValue.innerText = rangeInput.value;
      });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const rangeInput = document.getElementById('age');
  const displayValue = document.getElementById('age-val');

  if (rangeInput && displayValue) {
      rangeInput.addEventListener('input', () => {
          displayValue.innerText = rangeInput.value;
      });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.register__form');
  const usernameInput = document.getElementById('username');
  const usernameError = document.getElementById('username-error');

  if (form) {
      form.addEventListener('submit', (event) => {
          if (!usernameInput.value.trim()) {
              event.preventDefault();
              usernameError.classList.add('active');
              usernameInput.classList.add('invalid');
              // usernameInput.focus();
          } else {
              usernameError.classList.remove('active');
              usernameInput.classList.remove('invalid');
          }
      });
  }
});