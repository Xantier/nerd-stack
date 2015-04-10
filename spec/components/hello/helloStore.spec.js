'use strict';

const expect = require('chai').expect;
const helloStore = require('../../../app/components/hello/HelloStore');
const Dispatcher = require('../../../app/util/dispatcher');

describe('HelloStore', function () {
  it('should return default values of Loading and firstRun true', function () {
    const response = helloStore.getData();
    expect(response.data).to.have.property('user', 'Loading... ');
    expect(response.metadata).to.have.property('firstRun', true);
  });
  describe('Listener Testing', function () {
    const helloGet = require('../../../app/components/hello/HelloConstants').HelloConstants.GET;
    let spy = {called: false};

    function spyFunction() {
      spy.called = true;
    }

    helloStore.addChangeListener(helloGet, spyFunction);
    it('should emit an event when new data is set', function () {
      let dispatch = Dispatcher.transmit(helloGet);
      dispatch();
      expect(spy).to.have.property('called', true);
    });
    it('should not emit an event when listener is removed', function () {
      spy.called = false;
      helloStore.removeChangeListener(helloGet, spyFunction);
      let dispatch = Dispatcher.transmit(helloGet);
      dispatch();
      expect(spy).to.have.property('called', false);
    });
  });

});
