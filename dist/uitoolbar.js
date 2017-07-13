(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var runValidator = (function() {
  // define variables, strings etc.
  var msgPane = document.createElement('div');
  msgPane.classList.add('bem-resultpane');
  msgPane.classList.add('animated');
  var logMsg = '';
  //var logMsgHead = '<div class=\'bem-resultpane\'>';
  var logMsgTitle = ''; // defined at the end
  var logMsgContent = '<ol class=\'bem-resultpane__list\'>';
  var logMsgFoot = '</ol>';
  var errorsAmount = 0;

  // get all elements in a page
  var allEls = document.body.querySelectorAll('*');

  // traverse through all elements and see if the follow the rules
  for (i = 0; i < allEls.length ; i++) {
    var currentElement = allEls[i];

    // first check if it's a classless div or span
    if ((currentElement.tagName == 'DIV' || currentElement.tagName == 'SPAN') && (currentElement.classList.length === 0)) {
      logMsgContent += '<li class=\'bem-resultpane__item\'>Contains <code>' + currentElement.tagName + '</code> elements with no class. These are un-necessary.</li>';
      currentElement.classList.add('bem-error-item');
      errorsAmount++;
      // no need to move on with this element
      continue;
    }

    // get classlist and make into array
    var elClassSet = Array.from(currentElement.classList);
    // traverse through classes
    for (j = 0; j < elClassSet.length; j++) {
      var currentClass = elClassSet[j];
      // Is the class an Element (__)?
      var element = currentClass.indexOf('__') > -1;
      // yes
      if (element) {
        // if it's prefixed with "icon__" (icons) skip it
        if (!currentClass.indexOf('icon__') == 0) {
          // check if it's inside the right block
          var elementClass = currentClass.split('__')[0];
          var parentEl = currentElement.parentNode;
          var isInBlock = false;
          while (parentEl.tagName != 'HTML') {
            var parentElClassSet = Array.from(parentEl.classList);
            if (parentElClassSet.includes(elementClass)) { // TODO: includes fungerer ikke i IE. indexOf!
              isInBlock = true;
              break;
            }
            parentEl = parentEl.parentNode;
          }
          if (!isInBlock) {
            logMsgContent += '<li class=\'bem-resultpane__item\'><code>' + currentClass + '</code> is positioned outside the <strong>Block</strong> (' + currentClass.split('__')[0] + ').</li>';
            currentElement.classList.add('bem-error-item');
            errorsAmount++;
          }
          // check if it's double elemented ("x__y__z")
          var doubleElement = currentClass.match(/[\w-]+__[\w-]+__[\w-]+/g);
          if (doubleElement != null) {
            logMsgContent += '<li class=\'bem-resultpane__item\'><code>' + currentClass + '</code> is not a valid BEM class. Two <strong>Elements</strong> on the same class is not allowed.</li>';
            currentElement.classList.add('bem-error-item');
            errorsAmount++;
          }
        }
      }
      // does it contain a modifier?
      var modifier = currentClass.indexOf('--') > -1;
      // yes
      if (modifier) {
        // if it's prefixed with "u-" (utility), "w--" (width delimiter), "icon__" (icons) skip it
        if (!((currentClass.indexOf('u-') == 0) || (currentClass.indexOf('w--') == 0) || (currentClass.indexOf('icon') == 0))) {
          // double modifier
          var doubleModifier = currentClass.match(/[\w-]+--[\w-]+--[\w-]+/g);
          if (doubleModifier != null) {
            logMsgContent += '<li class=\'bem-resultpane__item\'><code>' + currentClass + '</code> is not a valid BEM class. Two <strong>Modifiers</strong> on the same class is not allowed.</li>';
            currentElement.classList.add('bem-error-item');
            errorsAmount++;
          }
          // check if the default class is present ("element element--modifier")
          var elementClass = currentClass.split('--')[0];
          if (!elClassSet.includes(elementClass)) {
            logMsgContent += '<li class=\'bem-resultpane__item\'><code>' + currentClass + '</code> is included without it\'s default <strong>Element</strong> (' + elementClass + ').</li>';
            currentElement.classList.add('bem-error-item');
            errorsAmount++;
          }
        }
      }
    }
  }
  //output logmsg
  if (errorsAmount == 0) {
    errorsAmount = '0';
    logMsgContent = '<p class="bem-resultpane__item bem-resultpane__item--success"><strong>Congratulations! No errors were found.</p>';
  }
  logMsgTitle = '<h1 class="bem-resultpane__header">BEM Inspect Results: <strong>' + errorsAmount + ' errors</strong><button class="bem-resultpane__close" id="bemCloseButton">Close</h1>';

  logMsg += logMsgTitle + logMsgContent + logMsgFoot;
  msgPane.innerHTML = logMsg;
  document.body.classList.add('is-bemvalidator');
  document.body.appendChild(msgPane);

  //hide the validator
  document.getElementById('bemCloseButton').addEventListener('click', function() {
    msgPane.classList.add('slideOutDown');
    setTimeout(function() {
      document.querySelector('.bem-resultpane').parentNode.removeChild(document.querySelector('.bem-resultpane'));
    }, 1000);
  });
});

module.exports.runValidator = runValidator;

},{}],2:[function(require,module,exports){
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
  var buttonsText = ['Validate HTML', 'Validate BEM', 'Grid', 'Edit-mode', 'Close'];
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
    document.body.classList.toggle('grid-overlay');
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

  /* append the bar */
  document.body.classList.add('is-debugbar');
  document.body.insertBefore(debugbarNav, document.body.firstChild);
})();

module.exports = debugbar;

},{"./bem-validator":1,"./html-validator":3}],3:[function(require,module,exports){
var runValidator = (function() {

  //taken from http://stackoverflow.com/questions/10377840/making-finding-html5-validator-bookmarklet
  // jscs:disable
  function domToString(document_root) {
    var html = '',
      node = document_root.firstChild;
    while (node) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          html += node.outerHTML;
          break;
        case Node.TEXT_NODE:
          html += node.nodeValue;
          break;
        case Node.CDATA_SECTION_NODE:
          html += '<![CDATA[' + node.nodeValue + ']]>';
          break;
        case Node.COMMENT_NODE:
          html += '<!--' + node.nodeValue + '-->';
          break;
        case Node.DOCUMENT_TYPE_NODE:
          // (X)HTML documents are identified by public identifiers
          html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
          break;
      }
      node = node.nextSibling;
    }
    return html;
  }

  (function() {
    var html_to_validate = domToString(document);
    function append(key, value) {
      var input = document.createElement('textarea');
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = 'http://validator.w3.org/check';
    form.enctype = 'multipart/form-data';         // Required for this validator
    form.target = '_blank';                       // Open in new tab
    append('fragment', html_to_validate);         // <-- Code to validate
    append('doctype', 'HTML5');                   // Validate as HTML 5
    append('group', '0');
    document.body.appendChild(form);
    form.submit();
    form.parentNode.removeChild(form);
  })();
  // jscs:enable
});

module.exports.runValidator = runValidator;

},{}],4:[function(require,module,exports){
var styles = (function() {
  var css = document.createElement('link');
  css.type = 'text/css';
  css.rel = 'stylesheet';
  css.href = 'https://youseedk.github.io/uitoolbar/dist/uitoolbar.css'
  document.head.appendChild(css);
})();

module.exports = styles;

},{}],5:[function(require,module,exports){
var styles = require('./styles');
var debugbar = require('./debug-bar');

},{"./debug-bar":2,"./styles":4}]},{},[5]);
