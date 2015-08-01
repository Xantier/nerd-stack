import {Dispatcher} from 'flux';
const IndexDispatcher = new Dispatcher();

IndexDispatcher.transmit = function (actionType) {
  return function (text) {
    IndexDispatcher.dispatch({
      actionType: actionType,
      text: text
    });
  };
};

export default IndexDispatcher;
