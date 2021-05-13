const filterCatalog = pageMain.querySelector('.filter-catalog');

if (filterCatalog) {
  // Remove fallback class
  const filterCatalogNoJS = filterCatalog.classList.contains('filter-catalog--no-js');

  if (filterCatalogNoJS) {
    filterCatalog.classList.remove('filter-catalog--no-js');
  }

  // Open filter
  let filterButtons = filterCatalog.querySelectorAll('.filter-catalog__legend');
  let filterOptions = filterCatalog.querySelectorAll('.filter-catalog__fieldset');

  for (let i = 0; i < filterButtons.length; i++) {
    let filterButton = filterButtons[i];
    let filterOption = filterOptions[i];

    filterButton.addEventListener('click', function() {
      let filterOptionOpen = filterOption.classList.contains('filter-catalog__fieldset--open');

      if (filterOptionOpen) {
        filterOption.classList.remove('filter-catalog__fieldset--open');
      } else {
        filterOption.classList.add('filter-catalog__fieldset--open');
      }
    });

    filterButton.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter' || evt.code === 'Space') {
        evt.preventDefault();

        let filterOptionOpen = filterOption.classList.contains('filter-catalog__fieldset--open');

        if (filterOptionOpen) {
          filterOption.classList.remove('filter-catalog__fieldset--open');
        } else {
          filterOption.classList.add('filter-catalog__fieldset--open');
        }
      }
    });
  }
}
