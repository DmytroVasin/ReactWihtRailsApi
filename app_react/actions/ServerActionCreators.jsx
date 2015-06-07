var AppDispatcher = require('../dispatcher/AppDispatcher.js');

module.exports = {
  receiveLogin: function(json, errors) {
    AppDispatcher.handleServerAction({
      // type: ActionTypes.LOGIN_RESPONSE, // wtf ???
      type: null,
      json: json,
      errors: errors
    });
  },
}
