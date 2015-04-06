'use strict';

let cache = require('./cache');

module.exports.rehydrate = () => {
  const data = window.__DATA__.data;
  const token = window.__DATA__.token;
  if (data) {
    Object.keys(data).forEach((key) => {
      cache.set(token, key, data[key]);
    });
  }
  delete window.__DATA__;
  return token;
};
