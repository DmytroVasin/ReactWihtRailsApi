'use strict';

var React = require('react');
var Router = require('react-router');

var actions = require('../../actions/actions');

var Link = Router.Link;

module.exports = React.createClass({
  propTypes: {
    isLoggedIn: React.PropTypes.bool,
    email:      React.PropTypes.string
  },

  logout: function() {
    actions.logout();
  },

  render: function() {
    var RightNavigation = this.props.isLoggedIn ? (
      <div className='float-right'>
        <span>
          <a className='register-link'>{this.props.email}</a>
        </span>
        <span>
          <a className='register-link' onClick={this.logout}>LogOut</a>
        </span>
        <a id='panel-toggle' className='panel-toggle'>
          <span className='sr-only'>Add Post</span>
        </a>
      </div>
    ) : (
      <div className='float-right'>
        <span>
          <Link to='login' className='register-link'>Sign In</Link>
        </span>
        <span>
          <Link to='signup' className='register-link'>Sign Up</Link>
        </span>
      </div>
    );

    return (
      <header className='header panel-open'>
        <div className='header-main'>
          <div className='float-left'>
            <a className='menu-title active' href='#'>react-news</a>
            <Link to='posts' className='menu-title'>Posts</Link>
            <Link to='about' className='menu-title'>About</Link>
          </div>

          { RightNavigation }
        </div>
      </header>
    );
  }
});

// HEADER ( Скрытый хеадер )
// <div id='header-panel' className='header-panel text-center'>
//   <form className='panel-form'>
//     <input type='text' className='panel-input' placeholder='Title' />
//     <input type='url' className='panel-input' placeholder='Link' />
//     <button type='submit' className='button panel-button button-outline'>Submit</button>
//   </form>
// </div>
