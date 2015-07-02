'use strict';

var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;

var LoginStore = require('../../stores/LoginStore'); // TODO: ПОЧЕМУ НЕ РАБОТАЕТ? - надо вешать два листенера!
var RegistrationStore = require('../../stores/RegistrationStore');

var actions = require('../../actions/actions');

var SignButton = require('../shared/SignButton.jsx');
var FlashMessage = require('../shared/FlashMessage.jsx');

function getStateFromStores() {
  return {
    signup_error_message: RegistrationStore.getSignupFlash(),
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

    var username = this.refs.username.getDOMNode().value.trim();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    this.setState({ processing: true });

    actions.signUp(username, email, password);
  },

  componentDidMount: function() {
    this.listenTo(RegistrationStore, this._onChange);
    this.listenTo(LoginStore, this._onChange);
  },

  _onChange: function(){
    // TODO: Дергаеться два раза - хуево
    // Дергаеться дважды - так как первая реация на unsuceess - и тогда не дергаеться loginStore
    // Если Succss мы еще и логинимся - и тогда пиздец - дергаеться второй store!

    if ( LoginStore.isLoggedIn() ){
      this.replaceWith('/about');
    } else {
      getStateFromStores();
    }

    this.setState( getStateFromStores() );
  },

  render: function() {
    return (
      <div className='login md-modal'>
        <form className='login-form' onSubmit={this._onSubmit}>
          <h1 className='text-center'>Register</h1>

          Username
          <br />
          <input type='text' placeholder='Username' defaultValue='Dima' ref='username' />

          Email
          <br />
          <input type='email' placeholder='Email' defaultValue='user1@example.com' ref='email' />

          Password
          <br />
          <input type='password' placeholder='Password' ref='password' />

          <SignButton processing={this.state.processing} button_text='Register' />
        </form>

        <FlashMessage errorMessage = {this.state.signup_error_message} />
      </div>
    );
  }
});
