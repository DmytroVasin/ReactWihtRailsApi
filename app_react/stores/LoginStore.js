'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');


var _accessToken = sessionStorage.getItem('accessToken');
var _email = sessionStorage.getItem('email');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(actions.login, this.onLogin);
    this.listenTo(actions.successLoggin, this.onSuccessLoggin);
    this.listenTo(actions.logout, this.onLogout);
  },

  isLoggedIn: function(){
    return Boolean(_accessToken);
  },

  getEmail: function(){
    return _email;
  },

  onLogin: function(email, password) {
    request.post('/v1/login')
      .send({ user: { email: email, password: password }})
      .set('Accept', 'application/json')
      .end(function(error, res){
        // убрать нах IF-ы
        if (res) {
          if (res.error) {
            // error...
          } else {
            var json = JSON.parse(res.text);
            actions.successLoggin(json); // здесь тригериться еще одно событие - что бы можно было сделать this.trigger - это правильно?'
          }
        }
      });
  },

  onSuccessLoggin: function(json){
    // Если слушает componentDidMount - и мне надо сделать редирект - нужно ли тригерить ?
    // может ли STORE слушать другой STORE

    _accessToken = json['access_token']
    _email = json['email']

    sessionStorage.setItem('accessToken', _accessToken);
    sessionStorage.setItem('email', _email);
    // если я тут хочу вернуь json и какой-то статус а ниже....
    this.trigger(); // Куда это нахрен ИДЕТ!???? Куда именно - какие параметры принимает и как на них реагирует ?
  },

  onLogout: function(){
    _accessToken = null;
    _email = null;

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    // а тут НАПРИМЕР хочу вернуть eror message  - как я их отличу в application.jsx по подписке
    // тогда не понадобиться танцевать с установкой локальных переменных: _accessToken, _email
    this.trigger(); // Куда это нахрен ИДЕТ!???? Куда именно
    // типо он всегда будет дергать - LoginStore.listen(this._onChange)?
  }
});
