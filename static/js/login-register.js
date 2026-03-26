console.log("JS-bestand succesvol geladen");

document.addEventListener('DOMContentLoaded', () => {
    // sliders
    const expInput = document.getElementById('experience');
    const expDisplay = document.getElementById('val');
    if (expInput && expDisplay) {
        expInput.addEventListener('input', () => {
            expDisplay.innerText = expInput.value;
        });
    }
    const ageInput = document.getElementById('age');
    const ageDisplay = document.getElementById('age-val');
    if (ageInput && ageDisplay) {
        ageInput.addEventListener('input', () => {
            ageDisplay.innerText = ageInput.value;
        });
    }

    // custom foutmelding
    const form = document.querySelector('.register__form');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('username-error');

    if (form && usernameInput && usernameError) {
        form.addEventListener('submit', (event) => {
            if (!usernameInput.value.trim()) {
                event.preventDefault();
                usernameError.classList.add('active');
                usernameInput.classList.add('invalid');
            } else {
                usernameError.classList.remove('active');
                usernameInput.classList.remove('invalid');
            }
        });
    }
    });
    const form = document.querySelector('.register__form');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('username-error');

    if (form && usernameInput && usernameError) {
        form.addEventListener('submit', (event) => {
            if (!usernameInput.value.trim()) {
                event.preventDefault();
                usernameError.classList.add('active');
                usernameInput.classList.add('invalid');
            } else {
                usernameError.classList.remove('active');
                usernameInput.classList.remove('invalid');
            }
        });
    };