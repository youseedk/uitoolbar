var styles = (function() {
  var css = document.createElement('link');
  css.type = 'text/css';
  css.rel = 'stylesheet';
  css.href = '../dist/uitoolbar.css'
  document.head.appendChild(css);
})();

module.exports = styles;
