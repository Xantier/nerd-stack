var cache = require('./cache');

module.exports = () => {
  var data = window.__DATA__.data;
  var token = window.__DATA__.token;
  if (data) {
    Object.keys(data).forEach((key) => {
      cache.set(token, key, data[key]);
    });
  }
  delete window.__DATA__;
  return token;
};
