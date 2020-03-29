const MENU = document.querySelector('.navigation');
const PORTFOLIO = document.querySelector('.project-wrapper');
const TAG_MENU = document.querySelector('.porfolio__header__navigation');

function send() {
    let form = document.querySelector('.forms');
    let theme = document.querySelector('#theme');
    let description = document.querySelector('#description');
    let ok = document.querySelector('#ok');
    ok.addEventListener('click', () => {
        document.querySelector('.modal').classList.add('off');
    })
    form.subject.value ? theme.innerHTML = 'Theme: ' + form.subject.value : theme.innerHTML = 'Theme: ' + 'No theme';
    form.details.value ? description.innerHTML = 'Description: ' + form.details.value : description.innerHTML = 'Description: ' + 'No Description';
    document.querySelector('.modal').classList.remove('off');
}


function randomFunction(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function makeRandomImages(event) {
  const element = event.target;

  if (element.className.includes('navigation_portfolio') && !element.className.includes('active')) {
    const imagesList = [...PORTFOLIO.querySelectorAll('.project-image')];
    let lengthList = imagesList.length;

    while (lengthList > 0) {
      let randomIndex = randomFunction(0, lengthList - 1);

      PORTFOLIO.append(imagesList[randomIndex]);
      imagesList.splice(randomIndex, 1);
      lengthList--;
    }
  }
}

function selectItem(event, block, classItem) {
  const element = event.target;

  if (element.className.includes(classItem)) {
    block.querySelectorAll('.' + classItem).forEach(el => el.classList.remove('active'));
    element.classList.add('active');
  }
}

MENU.addEventListener('click', (event) => selectItem(event, MENU, 'link'));
if (PORTFOLIO){ 
PORTFOLIO.addEventListener('click', (event) => selectItem(event, PORTFOLIO, 'project-image'));}
TAG_MENU.addEventListener('click', (event) => {
  makeRandomImages(event);
  selectItem(event, TAG_MENU, 'bordered');
});

let items = document.querySelectorAll('.carousel .carousel__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('carousel__item_active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('carousel__item_next', direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('carousel__item_next', direction);
    this.classList.add('carousel__item_active');
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

document.querySelector('.carousel__control_left').addEventListener('click', function () {
  if (isEnabled) {
    const CAROUSEL = document.querySelector('.carousel');

    previousItem(currentItem);

    CAROUSEL.classList.toggle('carousel_changed');
  }
});

document.querySelector('.carousel__control_right').addEventListener('click', function () {
  if (isEnabled) {
    const CAROUSEL = document.querySelector('.carousel');

    nextItem(currentItem);

    CAROUSEL.classList.toggle('carousel_changed');
  }
});

const swipeDetect = (el) => {

  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  }, false);

  surface.addEventListener('mouseup', function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if ((distX > 0)) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
    e.preventDefault();
  }, false);

  surface.addEventListener('touchstart', function (e) {
    if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
      if (e.target.classList.contains('left')) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      } else {
        if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }
    var touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  }, false);

  surface.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false);

  surface.addEventListener('touchend', function (e) {
    var touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if ((distX > 0)) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
    e.preventDefault();
  }, false);
}

var el = document.querySelector('.carousel');
swipeDetect(el);

function switchDisplay(event) {
  const element = event.target;

  if (element.className.includes('phone__button')) {
    element.previousElementSibling.classList.toggle('phone-display__image_active');
  }
}

const CAROUSEL = document.querySelector('.carousel');
CAROUSEL.addEventListener('click', (event) => switchDisplay(event));


