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
