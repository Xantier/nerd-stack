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
          cb(JSON.parse(response));
          return response;
        }
      });
}

function postXhrData(url, payload, cb) {
  let response;
  request.post(url_prefix + url)
      .type('application/json')
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
          cb(JSON.parse(response));
          return response;
        }
      });
}

module.exports.get = function (url, dispatch, req) {
  if (typeof window !== 'undefined') {
    return getXhrData(url, dispatch);
  } else {
    var res = {};
    return require('./' + url).get(req, res, function () {
      dispatch(res.payload);
      return res.payload;
    });
  }
};

module.exports.post = function (url, payload, dispatch) {
  return postXhrData(url, payload, dispatch);
};

module.exports.del = function (url, dispatch) {
  request.del(url_prefix + url)
      .type('application/json')
      .set('port', 3000)
      .end(function (err, res) {
        if (res.ok) {
          dispatch(JSON.parse(res.text));
        } else {
          dispatch('Failed to delete');
        }
      });
};
module.exports.put = function (/*url, payload, dispatch*/) {
  //TODO: Needs to be implemented
};
