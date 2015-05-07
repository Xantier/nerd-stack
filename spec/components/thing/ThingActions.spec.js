'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var ThingConstants = require('../../../app/components/thing/ThingConstants');

describe('ThingActions', function () {
  var thingActions;
  var response = {};

  before(function () {
    var fetcherStub = sinon.stub();
    fetcherStub.httpGet = function (url, dispatcher, context) {
      response.url = url;
      response.context = context;
    };
    fetcherStub.httpPost = function(url, payload){
      response.url = url;
      response.context = payload;
    };
    fetcherStub.httpPut = fetcherStub.httpPost;
    fetcherStub.httpDel = function(url){
      response.url = url;
    };
    var dispatcherStub = sinon.stub();
    thingActions = proxyquire('../../../app/components/thing/ThingActions',
        {'../../services/fetcher': fetcherStub},
        {'../../util/dispatcher': dispatcherStub}
    );
  });

  it('should Call getData with correct params', function () {
    var context = {};
    thingActions.getData(context);
    expect(response.url).to.equal('/thing');
    expect(response.context).to.equal(context);
    //expect(response.action).to.equal(ThingConstants.GET_THINGS);
  });
  it('should Call create with correct params', function () {
    var context = {};
    thingActions.create(context);
    expect(response.url).to.equal('/thing');
    expect(response.context).to.equal(context);
    //expect(response.action).to.equal(ThingConstants.CREATE_THINGS);
  });
  it('should Call update with correct params', function () {
    var context = {};
    thingActions.update(1, context);
    expect(response.url).to.equal('/thing/1');
    expect(response.context).to.equal(context);
    //expect(response.action).to.equal(ThingConstants.UPDATE_THINGS);
  });
  it('should Call del with correct params', function () {
    thingActions.del(1);
    expect(response.url).to.equal('/thing/1');
    //expect(response.action).to.equal(ThingConstants.DELETE_THINGS);
  });

});
