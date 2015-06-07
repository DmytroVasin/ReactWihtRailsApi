var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ActionTypes = require('../constants/Constants.js').ActionTypes;;

module.exports = {
  receiveLogin: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },
}
