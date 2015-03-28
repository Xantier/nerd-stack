'use strict';

var request = require('superagent');

function getXhrData(url, cb) {
   let response;
   const url_prefix = '/API';
   request.get(url_prefix + url)
         .set('Accept', 'application/json')
         .set('port', 3000)
         .end(function (err, res) {
            if (res.ok) {
               response = JSON.stringify(res.text);
            } else {
               response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
            }
            cb(response);
         });
}

function postXhrData(url, payload, cb) {
   let response;
   const url_prefix = '/API';
   request.post(url_prefix + url)
         .set('Accept', 'application/json')
         .set('port', 3000)
         .send(payload)
         .end(function (err, res) {
            if (res.ok) {
               response = JSON.stringify(res.text);
            } else {
               response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
            }
            cb(response);
         });
}

module.exports.get = function (url, dispatch) {
   if (typeof window !== 'undefined') {
      getXhrData(url, dispatch);
   } else {
      dispatch('Server Rendered Data');
   }
};

module.exports.post = function(url, payload, dispatch){
   if (typeof window !== 'undefined') {
      postXhrData(url, payload, dispatch);
   } else {
      dispatch('Server Rendered Data');
   }
};