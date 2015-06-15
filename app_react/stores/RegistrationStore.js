'use strict';

var Reflux = require('reflux');
var request = require('superagent');

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

  onSuccessSignUp: function(json_string_with_user){
    _signupFlashMessage = ''; // мб это как-то сделать в successLoggin?
    actions.successLoggin(json_string_with_user);
    this.trigger();
  },

  onUnSuccessSignUp: function(json_string_with_error){
    debugger;

    _signupFlashMessage = JSON.parse(json_string_with_error).error;
    this.trigger();
  },

  onSignUp: function(username, email, password, cb) {
    request.post('/v1/signup')
      .send({ user: { user_name: username, email: email, password: password }})
      .set('Accept', 'application/json')
      .end(function(error, res){  // КАК тут юзнуть success? или другой коллбек? -  и нужно ли вообще?

        if (res && res.error){
          // МБ всю эту херь луче вынести в cb ( что этот метод делал только signup и никого не логинил )
          debugger; // ПОЧЕМУ "cb"-callback дергаеться раньше чем - "unSuccessSignUp" ?????????????????? ( Смотреть в Debugger-e )  || это типо второй экшен
          actions.unSuccessSignUp(res.text);
          cb(false);
          return;
        };

        if (res && !res.error){
          actions.successSignUp(res.text);
          cb(true);
          return;
        };
      });
  },
});
