'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='login md-modal'>
        <form className='login-form'>
          <h1 className='text-center'>Register</h1>

          Username
          <br />
          <input type='text' placeholder='Username' ref='username' />

          Email
          <br />
          <input type='email' placeholder='Email' defaultValue='user@example.com' ref='email' />

          Password
          <br />
          <input type='password' placeholder='Password' ref='password' />

          <button type='submit' className='button button-primary'>Register</button>
        </form>
      </div>
    );
  }
});
