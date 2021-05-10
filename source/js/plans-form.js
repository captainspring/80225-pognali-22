const plansForm = document.querySelector('.add-plan__form');

if (plansForm) {
  // Delete fallback classes
  const secondStep = plansForm.querySelector('.step--second');
  const secondStepNoJS = secondStep.classList.contains('step--second-no-js');

  if (secondStepNoJS) {
    secondStep.classList.remove('step--second-no-js');
  }

  // Switching steps
  let planSteps = plansForm.querySelectorAll('.step');
  let firstStep = planSteps[0];

  let stepIndicators = document.querySelectorAll('.steps-tracker__item');

  for (let i = 0; i < planSteps.length; i++) {
    // delete fallback classes
    let stepNoJS = planSteps[i].classList.contains('step--no-js');

    if (stepNoJS) {
      planSteps[i].classList.remove('step--no-js');
    }

    // steps
    let currentStep = planSteps[i];
    let nextStep = planSteps[i + 1];
    let nextStepButton = currentStep.querySelector('.form__button');
    let previousStep = planSteps[i - 1];
    let previousStepButton = currentStep.querySelector('.form__back-link');

    // tracker
    let currentIndicator = stepIndicators[i];
    let nextIndicator = stepIndicators[i + 1];
    let previousIndicator = stepIndicators[i - 1];

    if (i != planSteps.length - 1) {
      nextStepButton.addEventListener('click', function (evt) {
        evt.preventDefault();

        currentStep.classList.remove('step--current');
        nextStep.classList.add('step--current');
        nextStep.scrollIntoView({behavior: 'smooth'});

        currentIndicator.classList.remove('steps-tracker__item--current');
        nextIndicator.classList.add('steps-tracker__item--current');
      });
    }

    if (previousStepButton) {
      previousStepButton.addEventListener('click', function (evt) {
        evt.preventDefault();

        currentStep.classList.remove('step--current');
        previousStep.classList.add('step--current');
        previousStep.scrollIntoView({behavior: 'smooth'});

        currentIndicator.classList.remove('steps-tracker__item--current');
        previousIndicator.classList.add('steps-tracker__item--current');
      })
    }
  }

  // Calendar tabindex
  let disabledDays = plansForm.querySelectorAll('.calendar__day--grey');

  for (let i = 0; i < disabledDays.length; i++) {
    let disabledDay = disabledDays[i];

    disabledDay.setAttribute('tabindex', '-1');
  }

  // Plans field validation
  const submitButton = plansForm.querySelector('button[type="submit"]');
  submitButton.addEventListener('click', function(evt) {
    let planDescriptions = plansForm.querySelectorAll('.descriptions__textarea');

    for (let i = 0; i < planDescriptions.length; i++) {
      let planDescription = planDescriptions[i];

      if (!planDescription.value) {
        evt.preventDefault();

        planDescription.classList.add('descriptions__textarea--error');
        planDescription.scrollIntoView({behavior: 'smooth', block: 'center'});
        planDescription.focus();
      } else {
        let planDescriptionUnfilled = planDescription.classList.contains('descriptions__textarea--error');

        if (planDescriptionUnfilled) {
          planDescription.classList.remove('descriptions__textarea--error');
        }
      }
    }
  });
}
