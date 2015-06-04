'use strict';

import request from 'superagent';
import {handleServerRequest} from './serverMediator';
import {get as getCached} from '../util/cache';
const url_prefix = '/API';

function getXhrData(url, cb) {
  let response;
  request.get(url_prefix + url)
      .set('Accept', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
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

export function httpGet(url, dispatch, context) {
  if (typeof window === 'undefined') {
    return handleServerRequest(url, context);
  }
  if (context) {
    const cached = getCached(context.token, context.displayName);
    if (cached) {
      // Rehydrates store with cached data
      dispatch(cached);
    }
  } else {
    // Fills store with retrieved data
    getXhrData(url, dispatch);
  }
}

export function httpPost(url, payload, dispatch) {
  let response;
  request.post(url_prefix + url)
      .type('application/json')
      .set('Accept', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('port', 3000)
      .send(payload)
      .end(function (err, res) {
        if (err) {
          response = {error: 'error: ' + err.message};
        }
        if (res.ok) {
          response = res.text;
        } else {
          response = JSON.stringify({error: 'error: ' + res.text});
        }
        if (dispatch) {
          dispatch(JSON.parse(response));
          return response;
        }
      });
}

export function httpDel(url, dispatch) {
  request.del(url_prefix + url)
      .type('application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
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

export function httpPut(url, payload, dispatch) {
  let response;
  request.put(url_prefix + url)
      .type('application/json')
      .set('Accept', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
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
