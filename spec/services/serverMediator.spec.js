var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var serverMediator;

describe('serverMediator', function () {
  var apiRouter, item, handleSpyFunction;
  var handleSpy = false;
  var passedInCallback;
  before('load service and stub dependencies', function () {
    handleSpyFunction = function (context, res, cb) {
      res.payload= 'testPayload';
      handleSpy = true;
      passedInCallback = cb;
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

  it('should pass in a callback that returns populatable response', function () {
    expect(passedInCallback()).to.be.equal('testPayload');
  });
});