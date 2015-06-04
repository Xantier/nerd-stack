'use strict';

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
  before('render and locate element', function () {
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

  it('Has thing-item div if not editing', function () {
    var divContainerComponent = TestUtils.findRenderedDOMComponentWithClass(
        thingComponent,
        'thing-item'
    );
    var containerElement = divContainerComponent.getDOMNode();
    expect(containerElement).to.not.be.null;
  });

  it('calls thingActions.del when _delete is called', function () {
    var linkComponents = TestUtils.scryRenderedDOMComponentsWithTag(
        thingComponent,
        'a'
    );
    var deleteAnchor = linkComponents[1].getDOMNode();
    TestUtils.Simulate.click(deleteAnchor);
    expect(thingActionsStub.del).to.be.called;
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
    thingComponent.setState({editing: false});
  });

  function hasUpdateButton() {
    var buttonComponent = TestUtils.findRenderedDOMComponentWithTag(
        thingComponent,
        'button'
    );
    var buttonElement = buttonComponent.getDOMNode();
    expect(buttonElement.firstChild.nodeValue).to.equal('Update');
  }

  it('Has button with update text if state is editing', function () {
    thingComponent.setState({editing: true});
    hasUpdateButton();
    thingComponent.setState({editing: false});
  });

  it('Changes it state to editing when right-clicked', function () {
    TestUtils.Simulate.contextMenu(thingComponent.refs.thingSpan.getDOMNode());
    hasUpdateButton();
  });

  it('calls _delete method when delete button is clicked', function () {
    var stub = sinon.stub(Thing.prototype.__reactAutoBindMap, "_delete");
    thingComponent = TestUtils.renderIntoDocument(
        <Thing _modify={modify} item={item} />
    );
    var linkComponents = TestUtils.scryRenderedDOMComponentsWithTag(
        thingComponent,
        'a'
    );
    var deleteAnchor = linkComponents[1].getDOMNode();
    TestUtils.Simulate.click(deleteAnchor);
    expect(stub).to.be.called;
  });

  it('calls injected _modify method when form is submitted', function () {
    thingComponent.setState({editing: true});
    var updateForm = thingComponent.refs.updateForm.getDOMNode();
    TestUtils.Simulate.submit(updateForm);
    expect(modifySpy).to.be.true;
    thingComponent.setState({editing: false});
  });

  it('Edits target value when editing and text entered into field', function () {
    thingComponent.setState({editing: true});
    var updateForm = thingComponent.refs.updateForm.getDOMNode();
    var value = 'testValue';
    TestUtils.Simulate.change(updateForm.firstChild, {target: {value: value}});
    expect(thingComponent.state.name).to.be.equal(value);
  });

});
