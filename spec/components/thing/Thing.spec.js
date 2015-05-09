'use strict';

require('../../testdom')('<html><body></body></html>'); // Remember to require and init before React
var React = require('react/addons');
var expect = require('chai').expect;
var Thing = require('../../../app/components/thing/Thing.jsx');
var TestUtils = React.addons.TestUtils;

var thingComponent;
describe('Thing component', function () {
  before('render and locate element', function () {
    var modify = function () {
    };
    var item = {
      id: 1,
      name: 'Test Item'
    };
    thingComponent = TestUtils.renderIntoDocument(
        <Thing _modify={modify} item={item} />
    );
  });

  it('Has input element if state is editing', function () {
    thingComponent.setState({editing: true});
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
        thingComponent,
        'input'
    );
    var inputElement = inputComponent.getDOMNode();
    expect(inputElement.getAttribute('type')).to.equal('text');
  });

  it('Has button with update text if state is editing', function () {
    thingComponent.setState({editing: true});
    var buttonComponent = TestUtils.findRenderedDOMComponentWithTag(
        thingComponent,
        'button'
    );
    var buttonElement = buttonComponent.getDOMNode();
    expect(buttonElement.firstChild.nodeValue).to.equal('Update');
  });
});
