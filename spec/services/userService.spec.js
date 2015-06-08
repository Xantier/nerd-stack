'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var config = require('../../app/config/config.json');
var userService;

describe('userService', function () {
  var userRepository;
  before('load service and stub dependencies', function () {

    userRepository = {};
    userRepository.getUser = sinon.spy();
    userService = proxyquire('../../app/services/userService',
        {['../data/' + config.db + '/persistence/userRepository']: userRepository}
    );
  });
  it('should call userRepository getUser when getting user', function(){
    var req = {};
    req.db = {};
    req.user = {};
    req.user.id = 1;
    userService.get(req, {});
    expect(userRepository.getUser.called).to.be.ok;
  });
});