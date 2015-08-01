var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var config = require('../../app/config/config.json');
var userService;

describe('userService', function () {
  var userRepository;
  var req = {
    db: {},
    user: {id: 1},
    body: {name: 'dummyName'}
  };
  before('load service and stub dependencies', function () {

    userRepository = {};
    userRepository.getUser = sinon.stub();
    userRepository.addUser = sinon.stub();
    userService = proxyquire('../../app/services/userService',
        {['../data/' + config.db + '/persistence/userRepository']: userRepository}
    );
  });

  it('should call userRepository getUser when getting user', function () {
    userService.get(req, {}, sinon.stub());
    expect(userRepository.getUser.called).to.be.ok;
  });

  it('should call passed in callback when successful repository data retrieval', function () {
    var res = {};
    var mockResult = {result: 'result'};
    userRepository.getUser.yields(null, mockResult);
    userService.get(req, res, function () {
      expect(res.payload.user).to.be.equal(mockResult);
    });
  });

  it('should call res with error status if repository retrieval fails', function () {
    var response = {
      status: function (errCode) {
        expect(errCode).to.be.equal(500);
        return response;
      },
      json: function (msg) {
        expect(msg.error).to.be.true;
      }
    };
    userRepository.getUser.yields({});
    userService.get(req, response, function () {
      return;
    });
  });

  it('should call userRepository addUser add called', function () {
    userService.add(req, {});
    expect(userRepository.addUser.called).to.be.ok;
  });

  it('should respond with json if successful repository call', function () {
    var response = {
      json: function (msg) {
        expect(msg.error).to.be.not.true;
      }
    };
    userRepository.addUser.yields(null, {user: {id: 1}});
    userService.add(req, response);
  });

  it('should respond with error status if repository call fails', function () {
    var response = {
      status: function (errCode) {
        expect(errCode).to.be.equal(500);
        return response;
      },
      json: function (msg) {
        expect(msg.error).to.be.true;
        expect(msg.data.message).to.be.equal('fails');
      }
    };
    userRepository.addUser.yields({message: 'fails'});
    userService.add(req, response);
  });


});