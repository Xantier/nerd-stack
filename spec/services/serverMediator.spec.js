'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var serverMediator;

describe('serverMediator', function () {
  var apiRouter, item, handleSpyFunction;
  var handleSpy = false;
  before('render and locate element', function () {
    handleSpyFunction = function () {
      handleSpy = true;
    };
    item = {
      id: 1,
      name: 'Test Item'
    };
    apiRouter = sinon.stub();
    apiRouter.stack = [{
      regexp: /^\/user\/?$/i,
      route: {
        stack: [
          {handle: handleSpyFunction}
        ]
      }
    }];
    serverMediator = proxyquire('../../app/services/serverMediator',
        {'../router/apiRouter.js': apiRouter}
    );
  });
  it('should call handle function when correct route is found', function () {
    var context = {};
    serverMediator.handleServerRequest('/user', context);
    expect(handleSpy).to.be.true;
  });
})
;