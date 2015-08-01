import { expect } from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import {set as setCache} from '../../app/util/cache';
import {httpGet, httpPost, httpDel, httpPut} from '../../app/services/fetcher';

var url = '/API/testUrl';

describe('fetcher', function () {
  var successfulResp = {data: 'successful response'};

  it('should call dispatch with cached data if context exists', function () {
    var cb = sinon.spy();
    var testData = {data: 'testdata'};
    setCache('token', 'key', testData);
    var testContext = {token: 'token', displayName: 'key'};
    httpGet('/testUrl', cb, testContext);
    expect(cb.calledWith(testData)).to.be.ok;
  });

  it('should respond with error message when get fails and no context passed in', function (done) {
    nock('http://localhost')
        .get(url).reply(404, 'something awful happened');
    var res;
    var stubCallback = function (response) {
      res = response;
      expect(res).to.deep.equal({'error': 'message: something awful happened'});
      done();
    };
    httpGet('/testUrl', stubCallback);
  });

  it('should call callback with response when get successful and no context passed in', function () {
    nock('http://localhost')
        .get(url).reply(200, successfulResp, {'Content-Type': 'application/json'});
    var stubCallback = function (response) {
      expect(response).to.equal(successfulResp);
    };
    httpGet('/testUrl', stubCallback);
  });

  it('should call callback with response when post successful', function () {
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
      expect(res).to.deep.equal({'error': 'message: something awful happened'});
      done();
    };
    httpPost('/testUrl', {}, stubCallback);
  });

  it('should call callback with response when delete succeeds', function () {
    nock('http://localhost')
        .delete(url).reply(200, successfulResp, {'Content-Type': 'application/json'});
    var stubCallback = function (response) {
      expect(response).to.equal(successfulResp);
    };
    httpDel('/testUrl', stubCallback);
  });

  it('should respond with error message when delete fails', function (done) {
    nock('http://localhost')
        .delete(url).reply(404, 'something awful happened');
    var res;
    var stubCallback = function (response) {
      res = response;
      expect(res).to.equal('Failed to delete');
      done();
    };
    httpDel('/testUrl', stubCallback);
  });

  it('should call callback with response when put succeeds', function () {
    nock('http://localhost')
        .put(url).reply(200, successfulResp, {'Content-Type': 'application/json'});
    var stubCallback = function (response) {
      expect(response).to.equal(successfulResp);
    };
    httpPut('/testUrl', {}, stubCallback);
  });

  it('should respond with error message when put fails', function (done) {
    nock('http://localhost')
        .put(url).reply(404, 'something awful happened');
    var res;
    var stubCallback = function (response) {
      res = response;
      expect(res).to.deep.equal({'error': 'message: something awful happened'});
      done();
    };
    httpPut('/testUrl', {}, stubCallback);
  });

});

