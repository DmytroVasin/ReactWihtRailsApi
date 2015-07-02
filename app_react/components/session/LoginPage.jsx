'use strict';

var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;

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

    actions.login(email, password);
  },


  componentDidMount: function() {
    this.listenTo(LoginStore, this._onChange);
  },

  _onChange: function(){
    // TODO: тупо как-то а если три состояния - то метов onChange будет пиздец какой большой!!!
    if ( LoginStore.isLoggedIn() ){
      this.replaceWith('/about');
    } else {
      this.refs.email.getDOMNode().value = '';
      this.refs.password.getDOMNode().value = '';
    }

    this.setState( getStateFromStores() );
  },

  render: function() {
    var FlashMessage = this.state.login_error_message ? (
      <div className='error login-error'>{ this.state.login_error_message }</div>
    ) : (
      null // !!! ничего не рендерим
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
