const filterCountry = pageMain.querySelector('.filter-country');

if (filterCountry) {
  // Remove fallback class
  const filterCountryNoJS = filterCountry.classList.contains('filter-country--no-js');

  if (filterCountryNoJS) {
    filterCountry.classList.remove('filter-country--no-js');
  }

  // Open filter
  const filterButton = filterCountry.querySelector('.filter-country__button');

  filterButton.addEventListener('click', function() {
    let filterCountryOpen = filterCountry.classList.contains('filter-country--open');

    if (filterCountryOpen) {
      filterCountry.classList.remove('filter-country--open');
    } else {
      filterCountry.classList.add('filter-country--open');
    }
  });

  // Close filter
  const filterButtonClose = filterCountry.querySelector('.filter-country__close');

  filterButtonClose.addEventListener('click', function() {
      filterCountry.classList.remove('filter-country--open');
  });
}
