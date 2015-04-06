'use strict';

const request = require('superagent');
const url_prefix = '/API';

function getXhrData(url, cb) {
  let response;
  request.get(url_prefix + url)
      .set('Accept', 'application/json')
      .set('port', 3000)
      .end(function (err, res) {
        if (err) {
          response = 'SOMETHING WENT WRONG \\o/ ' + err.message;
        }
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

export function get(url, dispatch, req) {
  if (typeof window !== 'undefined') {
    return getXhrData(url, dispatch);
  }
  let res = {};
  return require('./' + url).get(req, res, function () {
    dispatch(res.payload);
    return res.payload;
  });
}

export function post(url, payload, dispatch) {
  let response;
  request.post(url_prefix + url)
      .type('application/json')
      .set('Accept', 'application/json')
      .set('port', 3000)
      .send(payload)
      .end(function (err, res) {
        if (err) {
          response = 'SOMETHING WENT WRONG \\o/ ' + err.message;
        }
        if (res.ok) {
          response = res.text;
        } else {
          response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
        }
        if (dispatch) {
          dispatch(JSON.parse(response));
          return response;
        }
      });
}

export function del(url, dispatch) {
  request.del(url_prefix + url)
      .type('application/json')
      .set('port', 3000)
      .end(function (err, res) {
        let response;
        if (err) {
          response = 'SOMETHING WENT WRONG \\o/ ' + err.message;
        }
        if (res.ok) {
          response = res.text;
          dispatch(JSON.parse(response));
        } else {
          dispatch('Failed to delete');
        }
      });
}

export function put(url, payload, dispatch) {
  let response;
  request.put(url_prefix + url)
      .type('application/json')
      .set('Accept', 'application/json')
      .set('port', 3000)
      .send(payload)
      .end(function (err, res) {
        if (err) {
          response = 'SOMETHING WENT WRONG \\o/ ' + err.message;
        }
        if (res.ok) {
          response = res.text;
        } else {
          response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
        }
        if (dispatch) {
          dispatch(JSON.parse(response));
          return response;
        }
      });
}
