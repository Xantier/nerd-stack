require('../../testdom')('<html><body></body></html>'); // Remember to require and init before React
var React = require('react/addons');
var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var TestUtils = React.addons.TestUtils;
var Thing;
var thingActionsStub = {};

describe('Thing component', function () {
  var thingComponent, item, modify;
  var modifySpy = false;
  before('mock dependencies and render element', function () {
    global.componentHandler = {
      upgradeDom() {
      }
    };
    modify = function () {
      modifySpy = true;
    };
    item = {
      id: 1,
      name: 'Test Item'
    };
    thingActionsStub.del = sinon.stub();
    Thing = proxyquire('../../../app/components/thing/Thing.jsx',
        {'./ThingActions': thingActionsStub}
    );

    thingComponent = TestUtils.renderIntoDocument(
        <Thing _modify={modify} item={item} />
    );
  });

  it('Has correct Name showing on item', function () {
    var divContainerComponent = TestUtils.scryRenderedDOMComponentsWithTag(
        thingComponent,
        'td'
    );
    expect(divContainerComponent[0].props.children).to.contain(item.name);
  });

  it('Has delete link pointing to correct address', function () {
    var linkComponents = TestUtils.scryRenderedDOMComponentsWithTag(
        thingComponent,
        'a'
    );
    var anchor = linkComponents[0].getDOMNode();
    expect(anchor.getAttribute('href')).to.be.equal('/API/thing/' + item.id + '?_method=DELETE');
  });

});
