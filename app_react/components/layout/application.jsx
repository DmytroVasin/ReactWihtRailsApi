'use strict';

var React = require('react');
var Reflux = require('reflux');

var RouteHandler = require('react-router').RouteHandler;
var LoginStore = require('../../stores/LoginStore');

var Menu = require('./menu.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: LoginStore.isLoggedIn(),
    email: LoginStore.getEmail()
  };
}

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(LoginStore, '_onChange')
  ],

  getInitialState: function() {
    return getStateFromStores();
  },

  _onChange: function() {
    this.setState( getStateFromStores() );
  },

  render: function () {
    return (
      <div id='app'>
        <Menu isLoggedIn={this.state.isLoggedIn} email={this.state.email} />

        <div id='content'>
          <RouteHandler readFromAPI={this.readFromAPI} />
        </div>
      </div>
    );
  }
});
