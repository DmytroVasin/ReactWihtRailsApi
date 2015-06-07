var assign = require('object-assign');

var Dispatcher = require('flux').Dispatcher;


var AppDispatcher = assign(new Dispatcher(), {
  handleServerAction: function(action) {
    var payload = {
      // source: PayloadSources.SERVER_ACTION, - wtf ???
      source: null,
      action: action
    };
    this.dispatch(payload);
  },
  handleViewAction: function(action) {
    var payload = {
      // source: PayloadSources.VIEW_ACTION,
      source: null,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;
