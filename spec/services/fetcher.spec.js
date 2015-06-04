'use strict';

import { expect } from 'chai';
import nock from 'nock';
import {httpGet, httpPost, httpDel, httpPut} from '../../app/services/fetcher';

var url = '/API/testUrl';

describe('fetcher', function () {
  var successfulResp = {data: 'successful response'};
  it('should call callback with response', function () {
    nock('http://localhost')
        .post(url).reply(200, successfulResp, {'Content-Type': 'application/json'});
    var stubCallback = function (response) {
      expect(response).to.equal(successfulResp);
    };
    httpPost('/testUrl', {}, stubCallback);
  });

  it('should respond with error message when post fails', function (done) {
    nock('http://localhost')
        .post(url).reply(404, 'something awful happened');
    var res;
    var stubCallback = function (response) {
      res = response;
      expect(res).to.deep.equal({'error':'error: something awful happened'});
      done();
    };
    httpPost('/testUrl', {}, stubCallback);
  })
});

