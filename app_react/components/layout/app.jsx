var React = require('react');
var Router = require('react-router');
var Reqwest = require('reqwest');

var Menu = require('./menu.jsx');

var RouteHandler = Router.RouteHandler;


module.exports = React.createClass({
  getInitialState: function() {
    return {
      showMenu: false
    };
  },
  handleMenuClick: function() {
    console.log('.!.');
    this.setState({showMenu: !this.state.showMenu});
  },
  readFromAPI: function(url, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: 'get',

      success: successFunction,
      error: function(error) {
        location = '/';
      }
    });
  },

  render: function () {
    var menu = this.state.showMenu ? 'show-menu' : 'hide-menu';

    return (
      <div id='app' className={menu}>
        <Menu sendMenuClick={this.handleMenuClick} />

        <div id='content'>
          <RouteHandler readFromAPI={this.readFromAPI} />
        </div>
      </div>
    );
  }
});
