var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var SessionStore = require('../../stores/SessionStore.jsx');

// var Reqwest = require('reqwest');

var Menu = require('./menu.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
  };
}

module.exports = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },
  readFromAPI: function(url, successFunction) {
    // Reqwest({
    //   url: url,
    //   type: 'json',
    //   method: 'get',

    //   success: successFunction,
    //   error: function(error) {
    //     location = '/';
    //   }
    // });
  },

  // ------
  // listen to changes! fro update menu!
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },
  // ------

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
