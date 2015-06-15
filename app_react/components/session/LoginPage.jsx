'use strict';

var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;

// как правильно рекваирить ? ну типо с начала компоненты потом акшены потом сторы или как ? есть ли какой-то порядок ?
var LoginStore = require('../../stores/LoginStore');

var SignButton = require('../shared/SignButton.jsx');

var actions = require('../../actions/actions');

function getStateFromStores() {
  return {
    login_error_message: LoginStore.getLogginFlash(),
    processing: false
  };
}

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin, Navigation],

  getInitialState: function() {
    return getStateFromStores();
  },

  _onSubmit: function(e){
    e.preventDefault();

    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    this.setState({ processing: true });

    actions.login(email, password, function(loggedIn){
      // находиться ли оно в парвильном месте ?*????
      if (loggedIn){
        this.replaceWith('/about');
      }

      if (!loggedIn){
        getStateFromStores(); // - НАХУЙ НАДО? ОН ВООБЩЕ НЕ ОТРАБАТЫВАЕТ ЕПТ!
        // this.replaceWith('/login'); // нам не нужет этот replace так как мы уже находимя на этой странце


        // ВОПРОС: Если бы мне тут понадобилось выставить не дефолтный стейт processing: false- а какой-то другой -
        // мне что нужно два раза просписывать setState...
      }
    }.bind(this));

    // че за хуйня - почему тут?редиректа не будет если провалиться...
    // правильно держать во вьюхе вроде как = но не правильно делать редирект при ошибке валидации
    // логично это было бы делать в "LoginStore.listen" но блин там эта хрень реалирует на любое действие с locationStore...
    // не легче делать windows.location() ?
    // this.transitionTo('/');
  },


  componentDidMount: function() {
    // debugger;
    // ---- Какой из этих методов следует юзать?

    // var that = this; // remove that!
    // LoginStore.listen(function() {
    //   that._onChange();
    // })

    this.listenTo(LoginStore, this._onChange);
  },

  // И че - всегда так писать ? пздц какой-то
  _onChange: function(){
    // Этот метод дергается когда кто-то логиниться - какого хера - он не должен дергаться!!
    // тупо как-то.
    this.setState( getStateFromStores() );
  },

  render: function() {
    var FlashMessage = this.state.login_error_message ? (
      <div className='error login-error'>{ this.state.login_error_message }</div>
    ) : (
      <div></div>
    );

    return (
      <div className='login md-modal'>
        <form className='login-form' onSubmit={this._onSubmit}>
          <h1 className='text-center'>Login</h1>

          Email
          <br />
          <input type='email' placeholder='Email' defaultValue='user@example.com' ref='email' />

          Password
          <br />
          <input type='password' placeholder='Password' ref='password' />

          <SignButton processing={this.state.processing} button_text='Sign In' />
        </form>

        { FlashMessage }
      </div>
    );
  }
});
