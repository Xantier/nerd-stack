module.exports = function (markup) {
  if (typeof document !== 'undefined') return;
  global.document = require('jsdom').jsdom(markup || '');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };
};
