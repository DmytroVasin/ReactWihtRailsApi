'use strict';

require('whatwg-fetch');
var Reflux = require('reflux');

var actions = require('../actions/actions');


var _accessToken = sessionStorage.getItem('accessToken');
var _email = sessionStorage.getItem('email');
var _loginFlashMessage = '';

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(actions.login, this.onLogin);
    this.listenTo(actions.successLoggin, this.onSuccessLoggin);
    this.listenTo(actions.unSuccessLoggin, this.onUnSuccessLoggin);
    this.listenTo(actions.logout, this.onLogout);
  },

  isLoggedIn: function(){
    return Boolean(_accessToken);
  },

  getEmail: function(){
    return _email;
  },

  getLogginFlash: function(){
    return _loginFlashMessage;
  },

  onLogin: function(email, password) {
    fetch('/v1/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    }).then( function(response) {
      return response.json() // TODO: Че за нах - почему именно так ( не очень важно но все же )
    }).then(function(data) {

      if (data.error){
        return actions.unSuccessLoggin(data.error);
      }

      actions.successLoggin(data);
    })
  },

  onSuccessLoggin: function(userData){
    _accessToken = userData['access_token']
    _email = userData['email']

    sessionStorage.setItem('accessToken', _accessToken);
    sessionStorage.setItem('email', _email);
    _loginFlashMessage = '';

    this.trigger();
  },

  onUnSuccessLoggin: function(errorMessage){
    _loginFlashMessage = errorMessage;

    this.trigger();
  },

  onLogout: function(){
    _accessToken = null;
    _email = null;

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    this.trigger();
  }
});
