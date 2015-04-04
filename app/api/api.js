'use strict';

var request = require('superagent');
var cache = require('../util/cache');
const url_prefix = '/API';
const DUMMY_DATA = '[{"id": "1", "name": "You are seeing this because this data is rendered on the server side and rehydrated on the browser.' +
    ' DB fetch wrapper is not yet implemented for server rendering"}]';

//TODO: Refactor this to be more usable. Move cache handling to somewhere else

function getXhrData(token, url, cb) {
  let response;
  request.get(url_prefix + url)
      .set('Accept', 'application/json')
      .set('port', 3000)
      .end(function (err, res) {
        if (res.ok) {
          response = res.text;
          cache.set(token, url, response);
        } else {
          response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
        }
        if (cb) {
          cb(response);
          return response;
        }
      });
}

function postXhrData(token, url, payload, cb) {
  let response;
  request.post(url_prefix + url)
      .set('Accept', 'application/json')
      .set('port', 3000)
      .send(payload)
      .end(function (err, res) {
        if (res.ok) {
          response = res.text;
          cache.set(token, url, response);
        } else {
          response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
        }
        if (cb) {
          cb(response);
          return response;
        }
      });
}

module.exports.get = function (token, url, dispatch) {
  let cached = cache.get(token, url);
  if (cached) {
    dispatch(cached);
    return cached;
  }
  if (typeof window !== 'undefined') {
    return getXhrData(token, url, dispatch);
  } else {
    cache.set(token, url, DUMMY_DATA);
    dispatch(DUMMY_DATA);
    return DUMMY_DATA;
  }
};

module.exports.post = function (token, url, payload, dispatch) {
  let cached = cache.get(token, url);
  if (cached) {
    dispatch(cached);
    return cached;
  }
  if (typeof window !== 'undefined') {
    return postXhrData(token, url, payload, dispatch);
  } else {
    cache.set(token, url, DUMMY_DATA);
    dispatch(DUMMY_DATA);
    return DUMMY_DATA;
  }
};

module.exports.del = function (url, dispatch) {
  request.del(url_prefix + url)
      .set('port', 3000)
      .end(function (err, res) {
        if (res.ok) {
          dispatch('Deleted');
        } else {
          dispatch('Failed to delete');
        }
      });
};
module.exports.put = function (/*url, payload, dispatch*/) {
  //TODO: Needs to be implemented
};
