var bem = require('./bem-validator');
var html = require('./html-validator');

var debugbar = (function() {
  var debugbarNav = document.createElement('nav');
  debugbarNav.classList.add('debug-bar');
  debugbarNav.setAttribute('id', 'debugbar');

  var debugbarList = document.createElement('ul');
  debugbarList.classList.add('debug-bar__list');

  /* buttons: validate HTML, validate BEM, Toggle Grid, Toggle Editmode */
  var buttons = ['htmlvalidate', 'bemvalidate', 'togglegrid', 'toggleeditmode', 'close'];
  var buttonsText = ['Validate HTML', 'Validate BEM', 'Bootstrap grid', 'Edit-mode', 'Close'];
  var buttonsEvent = ['validateHTML', 'validateBEM', 'toggleGrid', 'toggleEditmode', 'closeToolbar'];
  var buttonModifier = ['', '', 'debug-bar__button--switch', 'debug-bar__button--switch', 'debug-bar__button--close'];

  for (i = 0; i < buttons.length; i++) {
    var listItem = document.createElement('li');
    listItem.classList.add('debug-bar__item');
    var button = document.createElement('button');
    var buttonText = document.createTextNode(buttonsText[i]);
    button.classList.add('debug-bar__button', 'debug-bar__button--' + buttons[i]);
    if (buttonModifier[i] != '') {
      button.classList.add(buttonModifier[i]);
    }
    button.appendChild(buttonText);

    listItem.appendChild(button);
    debugbarList.appendChild(listItem);
  }

  debugbarNav.appendChild(debugbarList);
  document.body.insertBefore(debugbarNav, document.body.firstChild);

  /* Grid button */
  var gridButton = document.querySelector('.debug-bar__button--togglegrid');
  gridButton.addEventListener('click', function(event) {
    event.preventDefault();
    this.classList.toggle('is-active');
    let domGrid = document.getElementsByClassName('grid-overlay');
    if (domGrid.length) {
      domGrid[0].parentNode.removeChild(domGrid[0]);
    } else {
      document.body.insertAdjacentHTML('afterbegin', '<div class="container grid-overlay"><div class="row"><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div><div class="col-1"><p class="grid-overlay__content">1/12</p></div></div></div>')
    }
  });

  /* Edit Button */
  var editButton = document.querySelector('.debug-bar__button--toggleeditmode');
  editButton.addEventListener('click', function(event) {
    event.preventDefault();
    this.classList.toggle('is-active');
    document.body.contentEditable = (document.body.contentEditable == 'true') ? 'false' : 'true';
  });

  /* HTML Validate button */
  var htmlValidateButton = document.querySelector('.debug-bar__button--htmlvalidate');
  htmlValidateButton.addEventListener('click', function() {
    html.runValidator();
  });

  /* BEM validate Button */
  var bemValidateButton = document.querySelector('.debug-bar__button--bemvalidate');
  bemValidateButton.addEventListener('click', function() {

    if (document.querySelector('.bem-resultpane')) {
      document.querySelector('.bem-resultpane').classList.add('slideOutDown');
      setTimeout(function() {
        document.querySelector('.bem-resultpane').parentNode.removeChild(document.querySelector('.bem-resultpane'));
      }, 1000);
    } else {
      bem.runValidator();
      document.querySelector('.bem-resultpane').classList.add('slideInUp');
    }
  });

  /* Close Button */
  var closeButton = document.querySelector('.debug-bar__button--close');
  closeButton.addEventListener('click', function() {
    location.reload();
  });

  /* Load and append tota11y from CDN */
  const script = document.createElement('script');
  script.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/tota11y/0.1.6/tota11y.min.js');
  document.head.appendChild(script);

  /* append the bar */
  document.body.classList.add('is-debugbar');
  document.body.insertBefore(debugbarNav, document.body.firstChild);
})();

module.exports = debugbar;
