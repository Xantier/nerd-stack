var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    GET_THINGS: null,
    CREATE_THING: null,
    UPDATE_THING: null,
    DELETE_THING: null
  })
};
