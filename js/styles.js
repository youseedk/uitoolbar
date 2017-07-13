var styles = (function() {
  var cssUrl = window.location.protocol + '//' + window.location.host + '/build/css/debug-toolbar/debug-toolbar.css';
  console.log(cssUrl);
  var css = document.createElement('link');
  css.type = 'text/css';
  css.rel = 'stylesheet';
  css.href = cssUrl;

  document.head.appendChild(css);
})();

module.exports = styles;
