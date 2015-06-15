'use strict';

var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;

var RegistrationStore = require('../../stores/RegistrationStore');
var actions = require('../../actions/actions');

var SignButton = require('../shared/SignButton.jsx');

function getStateFromStores() {
  return {
    signup_error_message: RegistrationStore.getSignupFlash(), // они должны быть разными ( login/signup ) ! - так как при переходе через формы будет сохраняться флеш месседж с другой формы
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

    actions.signUp(username, email, password, function(loggedIn){
      if (loggedIn){
        this.replaceWith('/about');
      }

      if (!loggedIn){
        debugger;
        getStateFromStores();
      }
    }.bind(this));
  },

  componentDidMount: function() {
    this.listenTo(RegistrationStore, this._onChange);
  },

  _onChange: function(){
    this.setState( getStateFromStores() );
  },

  render: function() {
    // дублирование кода!
    var FlashMessage = this.state.signup_error_message ? (
      <div className='error login-error'>{ this.state.signup_error_message }</div>
    ) : (
      <div></div>
    );

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

        { FlashMessage }
      </div>
    );
  }
});
