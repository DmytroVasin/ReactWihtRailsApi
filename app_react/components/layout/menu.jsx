var React = require('react');
var Router = require('react-router');
var SessionActionCreators = require('../../actions/SessionActionCreators.jsx');

var Link = Router.Link;

module.exports = React.createClass({
  propTypes: {
    isLoggedIn: React.PropTypes.bool,
    email:      React.PropTypes.string
  },

  logout: function(e) {
    SessionActionCreators.logout();
  },

  render: function() {
    var Nav = this.props.isLoggedIn ? (
      <ul>
        <li>{this.props.email}</li>
        <li><a href='#' onClick={this.logout}>Logout</a></li>
      </ul>
    ) : (
      <ul>
        <li>NO USER!</li>
      </ul>
    );

    return (
      <div id='menu'>
        <div id='menu-list'>
          <div className='pure-menu pure-menu-open'>
            <span className='pure-menu-heading'>Menu</span>
            {Nav}
            <ul>
              <li><Link to='blabs'>Blabs</Link></li>
              <li><Link to='about'>About</Link></li>
              <li><Link to='login'>Sign In</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
