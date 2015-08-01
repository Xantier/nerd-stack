const expect = require('chai').expect;
const userStore = require('../../../app/components/user/UserStore');
const Dispatcher = require('../../../app/util/dispatcher');

describe('UserStore', function () {
  it('should return default values of Loading and firstRun true', function () {
    const response = userStore.getData();
    expect(response.data).to.have.property('user', 'Loading... ');
    expect(response.metadata).to.have.property('firstRun', true);
  });
  describe('Listener Testing', function () {
    const userGet = require('../../../app/components/user/UserConstants').UserConstants.GET;
    let spy = {called: false};

    function spyFunction() {
      spy.called = true;
    }

    userStore.addChangeListener(userGet, spyFunction);
    it('should emit an event when new data is set', function () {
      let dispatch = Dispatcher.transmit(userGet);
      dispatch();
      expect(spy).to.have.property('called', true);
    });
    it('should not emit an event when listener is removed', function () {
      spy.called = false;
      userStore.removeChangeListener(userGet, spyFunction);
      let dispatch = Dispatcher.transmit(userGet);
      dispatch();
      expect(spy).to.have.property('called', false);
    });
  });

});
