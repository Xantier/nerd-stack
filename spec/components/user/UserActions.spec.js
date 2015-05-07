'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('UserActions', function () {
  var userActions;
  var response = {};
  var dispatcherStub = sinon.stub();
  before(function () {
    var fetcherStub = sinon.stub();
    fetcherStub.httpGet = function (url, dispatcher, context) {
      response.url = url;
      response.dispatcher = dispatcher;
      response.context = context;
    };
    userActions = proxyquire('../../../app/components/user/UserActions',
        {'../../services/fetcher': fetcherStub},
        {'../../util/dispatcher': dispatcherStub}
    );
  });

  it('should Call getData with correct params', function () {
    var context = {};
    userActions.getData(context);
    expect(response.url).to.equal('/user');
    expect(response.context).to.equal(context);
    expect(dispatcherStub.called);
  });

});
