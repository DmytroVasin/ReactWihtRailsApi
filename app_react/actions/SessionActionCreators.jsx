var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var ActionTypes = require('../constants/Constants.js').ActionTypes;;

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

module.exports = {
  login: function(email, password) {
    // ???
    WebAPIUtils.login(email, password);
  },
  logout: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
}
