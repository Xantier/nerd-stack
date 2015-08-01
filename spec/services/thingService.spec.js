var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var config = require('../../app/config/config.json');
var thingService, respondData;

var respond = function (unimportant1, unimportant2, _respondData) {
  console.log('called');
  respondData = _respondData;
};

describe('thingService', function () {
  var thingRepository, flashMsg;
  var req = {
    db: {},
    user: {id: 1},
    params: {id: 1},
    body: {name: 'dummyName'},
    flash: function (msg) {
      flashMsg = msg;
    }, get: function (identifier) {
      return {address: identifier};
    }
  };
  before('load service and stub dependencies', function () {
    thingRepository = {};
    thingRepository.getThingsById = sinon.stub();
    thingRepository.addThingToUser = sinon.stub();
    thingRepository.deleteThing = sinon.stub();
    thingRepository.updateThing = sinon.stub();
    thingService = proxyquire('../../app/services/thingService',
        {['../data/' + config.db + '/persistence/thingRepository']: thingRepository}
    );
  });

  it('should call thingRepository getThingsById when getting things', function () {
    thingService.get(req, {});
    expect(thingRepository.getThingsById.called).to.be.ok;
  });

  it('should call passed in callback when successful repository data retrieval', function () {
    var res = {};
    var mockResult = {result: 'result'};
    thingRepository.getThingsById.yields(null, mockResult);
    thingService.get(req, res, function () {
      expect(res.payload).to.be.deep.equal({things: mockResult});
    });
  });

  it('should call res with error status if repository call fails', function () {
    var response = {
      status: function (errCode) {
        expect(errCode).to.be.equal(500);
        return response;
      },
      json: function (msg) {
        expect(msg.error).to.be.true;
      },
      redirect: function (address) {
        expect(address).to.deep.equal({address: 'Referrer'});
      }
    };
    var next = function () {
    };
    thingRepository.getThingsById.yields({});
    thingService.get(req, response, next);
    thingRepository.addThingToUser.yields({});
    thingService.add(req, response, next);
    thingRepository.deleteThing.yields({});
    thingService.del(req, response, next);
    thingRepository.updateThing.yields({});
    thingService.set(req, response, next);
  });

  it('should respond through responder with a thing if save successful', function () {
    var res = {
      json: function (msg) {
        expect(msg.error).to.be.not.true;
        expect(msg.data).to.be.deep.equal({result: 'result'});
      }
    };
    req.xhr = true;
    var mockResult = {result: 'result'};
    thingRepository.addThingToUser.yields(null, mockResult);
    thingService.add(req, res);
  });

  it('should respond through responder with a successful deletion message if deletion successful', function () {
    var res = {
      json: function (msg) {
        expect(msg.error).to.be.not.true;
        expect(msg.data.message).to.be.deep.equal('Thing deleted');
        expect(msg.data.id).to.be.deep.equal(1);
      }
    };
    req.xhr = true;
    var mockResult = 1;
    thingRepository.deleteThing.yields(null, mockResult);
    thingService.del(req, res);
  });

  it('should respond through responder with a thing if update successful', function () {
    var res = {
      json: function (msg) {
        expect(msg.error).to.be.not.true;
        expect(msg.data).to.be.deep.equal({result: 'result'});
      }
    };
    req.xhr = true;
    var mockResult = {result: 'result'};
    thingRepository.updateThing.yields(null, mockResult);
    thingService.set(req, res);
  });

});