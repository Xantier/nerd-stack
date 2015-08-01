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

  it('should be able to create an instance of Actions class', function(){
    var actions = new userActions();
    expect(actions).to.be.not.null;
  });

  it('shouldn\'t be able to call class as a function', function(){
    expect(userActions).to.throw(TypeError);
  });

});
