const registerForm = document.querySelector('.feedback-form');

if(registerForm) {
  const registerEmail = registerForm.querySelector('#feedback-email');

  registerForm.addEventListener('submit', function (evt) {
    if (!registerEmail.value) {
      evt.preventDefault();

      registerEmail.classList.add('feedback-form__input--error');
      registerEmail.placeholder = 'Введите e-mail';
    }
  })
}
