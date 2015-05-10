'use strict';

require('../../testdom')('<html><body></body></html>'); // Remember to require and init before React
var React = require('react/addons');
var expect = require('chai').expect;
var Thing = require('../../../app/components/thing/Thing.jsx');
var TestUtils = React.addons.TestUtils;

var thingComponent, item;
describe('Thing component', function () {
  before('render and locate element', function () {
    var modify = function () {
    };
    item = {
      id: 1,
      name: 'Test Item'
    };
    thingComponent = TestUtils.renderIntoDocument(
        <Thing _modify={modify} item={item} />
    );
  });

  it('Has thing-item div if not editing', function () {
    var divContainerComponent = TestUtils.findRenderedDOMComponentWithClass(
        thingComponent,
        'thing-item'
    );
    var containerElement = divContainerComponent.getDOMNode();
    expect(containerElement).to.not.be.null;
  });

  it('Has correct Name showing on item', function () {
    var divContainerComponent = TestUtils.findRenderedDOMComponentWithClass(
        thingComponent,
        'thing-item'
    );
    var containerElement = divContainerComponent.getDOMNode();
    expect(containerElement.firstChild.textContent).to.contain(item.name);
  });

  it('Has delete link pointing to correct address', function () {
    var linkComponents = TestUtils.scryRenderedDOMComponentsWithTag(
        thingComponent,
        'a'
    );
    var anchor = linkComponents[0].getDOMNode();
    expect(anchor.getAttribute('href')).to.be.equal('/API/thing/' + item.id + '?_method=DELETE');
  });

  it('Has delete Button with no href', function () {
    var linkComponents = TestUtils.scryRenderedDOMComponentsWithTag(
        thingComponent,
        'a'
    );
    var anchor = linkComponents[1].getDOMNode();
    expect(anchor.href).to.be.equal('');
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
