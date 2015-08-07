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
    // надо слушать роутер!
    // this.replaceWith('/about');
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

        <Link to='post_new' className='panel-toggle'>
          <span className='sr-only'>Add Post</span>
        </Link>
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
