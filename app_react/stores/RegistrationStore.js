'use strict';

require('whatwg-fetch');
var Reflux = require('reflux');

var actions = require('../actions/actions');


var _signupFlashMessage = '';

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(actions.signUp, this.onSignUp);
    this.listenTo(actions.unSuccessSignUp, this.onUnSuccessSignUp);
    this.listenTo(actions.successSignUp, this.onSuccessSignUp);
  },

  getSignupFlash: function(){
    return _signupFlashMessage;
  },

  onSuccessSignUp: function(userData){
    _signupFlashMessage = '';
    actions.successLoggin(userData);

    this.trigger();
  },

  onUnSuccessSignUp: function(errorMessage){
    _signupFlashMessage = errorMessage;

    this.trigger();
  },

  onSignUp: function(username, email, password) {
    fetch('/v1/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          user_name: username,
          email: email,
          password: password
        }
      })
    }).then( function(response) {
      return response.json()
    }).then(function(data) {
      if (data.error){
        return actions.unSuccessSignUp(data.error);
      }

      actions.successSignUp(data);
    })
  }
});
