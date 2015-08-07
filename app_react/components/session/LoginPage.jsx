'use strict';

var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;

var LoginStore = require('../../stores/LoginStore');

var SignButton = require('../shared/SignButton.jsx');
var FlashMessage = require('../shared/FlashMessage.jsx');

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

    actions.login(email, password);
  },


  componentDidMount: function() {
    this.listenTo(LoginStore, this._onChange);
  },

  _onChange: function(){
    if ( LoginStore.isLoggedIn() ){
      this.replaceWith('/about');
      // ретурн забыл!
    } else {
      this.refs.email.getDOMNode().value = '';
      this.refs.password.getDOMNode().value = '';
      // сбрасывать инпуты через реакт!
      // дефолтный велью брать со стейта и сделать сет стейт
    }

    this.setState( getStateFromStores() );
  },

  render: function() {
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

        <FlashMessage errorMessage = {this.state.login_error_message} />
      </div>
    );
  }
});
