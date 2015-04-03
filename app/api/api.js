'use strict';

var request = require('superagent');
const url_prefix = '/API';

function getXhrData(url, cb) {
  let response;
  request.get(url_prefix + url)
      .set('Accept', 'application/json')
      .set('port', 3000)
      .end(function (err, res) {
        if (res.ok) {
          response = res.text;
        } else {
          response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
        }
        if (cb) {
          cb(response);
        }
      });
}

function postXhrData(url, payload, cb) {
  let response;
  request.post(url_prefix + url)
      .set('Accept', 'application/json')
      .set('port', 3000)
      .send(payload)
      .end(function (err, res) {
        if (res.ok) {
          response = res.text;
        } else {
          response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
        }
        if (cb) {
          cb(response);
        }
      });
}

module.exports.get = function (url, dispatch) {
  if (typeof window !== 'undefined') {
    getXhrData(url, dispatch);
  } else {
    dispatch('[{"id": "1", "name": "Unimplemented server rendered DB fetch Wrapper"}]');
  }
};

module.exports.post = function (url, payload, dispatch) {
  if (typeof window !== 'undefined') {
    postXhrData(url, payload, dispatch);
  } else {
    dispatch('Server Rendered Data');
  }
};
