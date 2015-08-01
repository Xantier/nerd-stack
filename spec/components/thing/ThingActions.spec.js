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
    fetcherStub.httpPost = function (url, payload) {
      response.url = url;
      response.context = payload;
    };
    fetcherStub.httpPut = fetcherStub.httpPost;
    fetcherStub.httpDel = function (url) {
      response.url = url;
    };

    thingActions = proxyquire('../../../app/components/thing/ThingActions', {
          '../../services/fetcher': fetcherStub,
          '../../util/dispatcher': {
            transmit: function (actionType) {
              response.action = actionType;
            }
          }
        }
    );
  });

  it('should Call getData with correct params', function () {
    var context = {};
    thingActions.getData(context);
    expect(response.url).to.equal('/thing');
    expect(response.context).to.equal(context);
    expect(response.action).to.equal(ThingConstants.ThingConstants.GET_THINGS);
  });
  it('should Call create with correct params', function () {
    var context = {};
    thingActions.create(context);
    expect(response.url).to.equal('/thing');
    expect(response.context).to.equal(context);
    expect(response.action).to.equal(ThingConstants.ThingConstants.CREATE_THING);
  });
  it('should Call update with correct params', function () {
    var context = {};
    thingActions.update(1, context);
    expect(response.url).to.equal('/thing/1');
    expect(response.context).to.equal(context);
    expect(response.action).to.equal(ThingConstants.ThingConstants.UPDATE_THING);
  });
  it('should Call del with correct params', function () {
    thingActions.del(1);
    expect(response.url).to.equal('/thing/1');
    expect(response.action).to.equal(ThingConstants.ThingConstants.DELETE_THING);
  });

  it('should be able to create an instance of Actions class', function(){
    var actions = new thingActions();
    expect(actions).to.be.not.null;
  });

  it('shouldn\'t be able to call class as a function', function(){
    expect(thingActions).to.throw(TypeError);
  });


});
