import { expect } from 'chai';
import respond from '../../app/services/responder';

describe('responder', function () {
  var responseData, flashMsg;
  var redirAddress;
  var request = {flash:function(msg){
    flashMsg = msg;
  }, get: function(identifier){
    return {address: identifier};
  }};

  it('should call res.redirect if request isn\'t Ajax', function (done) {
    var response = {
      redirect: function(address){
        redirAddress = address;
        done();
      }
    };
    var data = 'hello world';
    respond(request, response, data);
    expect(redirAddress).to.deep.equal({address: 'Referrer'});
  });

  it('should call res.json with data on ajax request', function (done) {
    request.xhr = true;
    var response = {
      json: function (data) {
        responseData = data;
        done();
      }
    };
    var data = 'hello world';
    respond(request, response, data);
    expect(data).to.equal(responseData);
  });

});
