'use strict';

var React = require('react');
var Navigation = require('react-router').Navigation;

var LoginStore = require('../../stores/LoginStore');
var actions = require('../../actions/actions');

module.exports = React.createClass({
  mixins: [Navigation],

  _onSubmit: function(e){
    e.preventDefault();

    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    actions.login(email, password);
    // че за хуйня - почему тут?редиректа не будет если провалиться...
    // правильно держать во вьюхе вроде как = но не правильно делать редирект при ошибке валидации
    // логично это было бы делать в "LoginStore.listen" но блин там эта хрень реалирует на любое действие с locationStore...
    // не легче делать windows.location() ?
    this.transitionTo('/');
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

          <button type='submit' className='button button-primary'>Sign In</button>
        </form>
      </div>
    );
  }
});
