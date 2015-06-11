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
  mixins: [Reflux.ListenerMixin],
  // mixins: [
  //   Reflux.listenTo(LoginStore, '_onChange')
  // ],

  getInitialState: function() {
    return getStateFromStores();
  },

  _onChange: function() {
    this.setState( getStateFromStores() );
  },

  componentDidMount: function() {
    // ---- Какой из этих методов следует юзать?

    // var that = this; // remove that!
    // LoginStore.listen(function() {
    //   that._onChange();
    // })
    this.listenTo(LoginStore, this._onChange);
  },

  render: function () {
    return (
      <div id='app' className='full-height'>
        <div className='wrapper full-height'>
          <Menu isLoggedIn={this.state.isLoggedIn} email={this.state.email} />

          <main id='content' className='full-height inner'>
            <RouteHandler readFromAPI={this.readFromAPI} />
          </main>
        </div>
      </div>
    );
  }
});
