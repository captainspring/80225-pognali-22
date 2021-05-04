const ratesLink = document.querySelector('.rates__link');
const ratesModal = document.querySelector('.modal--business-rates');
const closeButtonModal = ratesModal.querySelector('.modal__button-close');

if(ratesModal) {
  //Modal -- open
  ratesLink.addEventListener('click', function(evt) {
    evt.preventDefault();

    ratesModal.classList.add('modal--show');
  });

  ratesLink.addEventListener('keydown', function(evt) {
    evt.preventDefault();

    if (evt.key === 'Enter') {
      ratesModal.classList.add('modal--show');

      setTimeout(function () {
        closeButtonModal.focus();
      }, 1);
    }
  });

  // Modal -- close
  closeButtonModal.addEventListener('click', function(evt) {
    evt.preventDefault();

    ratesModal.classList.remove('modal--show');
  });

  window.addEventListener('keydown', function(evt) {
    let ratesModalOpen = ratesModal.classList.contains('modal--show');

    if (evt.key === 'Escape' && ratesModalOpen) {
      evt.preventDefault();

      ratesModal.classList.remove('modal--show');
    }
  });
}
