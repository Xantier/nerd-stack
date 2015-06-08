'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var config = require('../../app/config/config.json');
var thingService;

describe('thingService', function () {
  var thingRepository;
  before('load service and stub dependencies', function () {

    thingRepository = {};
    thingRepository.getThingsById = sinon.spy();
    thingService = proxyquire('../../app/services/thingService',
        {['../data/' + config.db + '/persistence/thingRepository']: thingRepository}
    );
  });
  it('should call thingRepository getThingsById when getting things', function(){
    var req = {};
    req.db = {};
    req.user = {};
    req.user.id = 1;
    thingService.get(req, {});
    expect(thingRepository.getThingsById.called).to.be.ok;
  });
});