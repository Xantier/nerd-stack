import IndexDispatcher from '../../util/dispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import {UserConstants} from './UserConstants';

let text = {user: 'Loading... '};
let metadata = {firstRun: true};

function setText(newText) {
  if (metadata.firstRun) {
    metadata.firstRun = false;
  }
  text = newText;
}

const UserStore = assign({}, EventEmitter.prototype, {
  getData: function () {
    return {
      data: text,
      metadata: metadata
    };
  },

  emitChange: function (actionType) {
    this.emit(actionType);
  },

  addChangeListener: function (event, callback) {
    this.on(event, callback);
  },

  removeChangeListener: function (event, callback) {
    this.removeListener(event, callback);
  }
});

// Register callback to handle all updates
IndexDispatcher.register(function (action) {
  switch (action.actionType) {
    case UserConstants.GET:
      setText(action.text);
      break;
    default:
    // no op
  }
  UserStore.emitChange(action.actionType);
});

export default UserStore;
