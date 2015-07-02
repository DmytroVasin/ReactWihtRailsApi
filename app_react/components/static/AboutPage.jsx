'use strict';

var React = require('react');

var StaticInformationStore = require('../../stores/StaticInformationStore');

function getStateFromStores() {
  return {
    about_text: StaticInformationStore.getAbout()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    StaticInformationStore.listen(this._onChange);
    StaticInformationStore.fetchAbout();
  },

  _onChange: function(){
    this.setState( getStateFromStores() );
  },

  render: function() {
    var Container = this.state.about_text ? (
      <p>{ this.state.about_text }</p>
    ) : (
      <div className='preloader'></div>
    )

    return (
      <div id='about-view'>
        <h1>About</h1>
        { Container }
      </div>
    );
  }
});
