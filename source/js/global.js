const topBar = document.querySelector('.top-bar');
const mainMenu = topBar.querySelector('.menu');
const mainNav = mainMenu.querySelector('.navigation');
const pageMain = document.querySelector('.page-main');

//////// If JS is enabled, remove fallback classes
const topBarNoJS = topBar.classList.contains('top-bar--no-js');
const mainMenuNoJS = mainMenu.classList.contains('menu--no-js');
const pageMainNoJS = pageMain.classList.contains('page-main--no-js');

if (topBarNoJS) {
  topBar.classList.remove('top-bar--no-js');
}

if (mainMenuNoJS) {
  mainMenu.classList.remove('menu--no-js');
}

if (pageMainNoJS) {
  pageMain.classList.remove('page-main--no-js');
}

//////// Menu
const mainMenuToggle = mainMenu.querySelector('.menu__toggle');

if (mainMenuToggle) {
  // Menu -- open
  mainMenuToggle.addEventListener('click', function() {
    let menuOpen = mainMenu.classList.contains('menu--show');
    let topBarScrolled = topBar.classList.contains('top-bar--scroll');
    let scrollPosition = window.scrollY;

    if (menuOpen) {
      mainMenu.classList.remove('menu--show');
      topBar.classList.remove('top-bar--menu-open');

      if (scrollPosition >= topBar.offsetHeight) {
        topBar.classList.add('top-bar--scroll');
      }
    } else {
      mainMenu.classList.add('menu--show');
      topBar.classList.add('top-bar--menu-open');

      if (topBarScrolled) {
        topBar.classList.remove('top-bar--scroll');
      }
    }
  })

  // Menu -- close on Esc
  window.addEventListener('keydown', function(evt) {
    let menuOpen = mainMenu.classList.contains('menu--show');

    if (menuOpen) {
      if (evt.key === 'Escape') {
        mainMenu.classList.remove('menu--show');
        topBar.classList.remove('top-bar--menu-open');
      }
    }
  })
}

// No menu classes on desktop
window.addEventListener('resize', function() {
  let windowWidth = window.innerWidth;

  if (windowWidth >= 1440) {
    topBar.classList.remove('top-bar--menu-open');
    mainMenu.classList.remove('menu--show');
  }
})

//////// Top bar scroll
let scrollPosition = window.scrollY;
const topBarHeight = topBar.offsetHeight;

// Show scroll top-bar on scroll
window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY;
  let menuOpen = mainMenu.classList.contains('menu--show');

  if (!menuOpen) {
    if (scrollPosition >= topBarHeight) {
      topBar.classList.add('top-bar--scroll');
      mainNav.classList.add('navigation--scroll');
    } else {
      topBar.classList.remove('top-bar--scroll');
      mainNav.classList.remove('navigation--scroll');
    }
  }
})
