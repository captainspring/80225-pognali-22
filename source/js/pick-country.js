const buttonContainer = document.querySelector('.select-country__controls--unpicked');
const pickButton = buttonContainer.querySelector('.select-country__pick-button');
const choiceContainer = document.querySelector('.select-country__choice-container');

if(pickButton) {
  pickButton.addEventListener('click', function() {
    let choiceContainerShown = choiceContainer.classList.contains('select-country__choice-container--show');

    if(!choiceContainerShown) {
      buttonContainer.classList.add('select-country__controls--active');
      pickButton.classList.add('button--select-clicked');
      choiceContainer.classList.add('select-country__choice-container--show');
    } else {
      buttonContainer.classList.remove('select-country__controls--active');
      pickButton.classList.remove('button--select-clicked');
      choiceContainer.classList.remove('select-country__choice-container--show');
    }
  });
}
