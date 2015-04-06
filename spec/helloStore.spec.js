'use strict';

const expect = require('chai').expect;
let helloStore = require('../app/components/hello/helloStore');

describe('HelloStore', function () {
  describe('getData()', function () {
    it('should return default values of Loading and firstRun true', function () {
      const response = helloStore.getData();
      expect(response).to.have.property('text', 'Loading... ');
      expect(response.metadata).to.have.property('firstRun', true);
    });
  });
});
