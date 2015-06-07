var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _accessToken = sessionStorage.getItem('accessToken');
var _email = sessionStorage.getItem('email');

var SessionStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit('change');
  },

  isLoggedIn: function(){
    return _accessToken ? true : false;
  },

  getEmail: function(){
    return _email;
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});


SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  if (action.json && action.json.access_token) {
    _accessToken = action.json.access_token;
    _email = action.json.email;

    // Token will always live in the session, so that the API can grab it with no hassle
    sessionStorage.setItem('accessToken', _accessToken);
    sessionStorage.setItem('email', _email);
  }

  if (action.errors) {
    _errors = action.errors;
  }

  SessionStore.emitChange();

  return true;
});


module.exports = SessionStore;
