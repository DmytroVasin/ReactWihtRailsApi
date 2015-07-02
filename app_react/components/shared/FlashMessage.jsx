'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {

    var flashMessage = this.props.errorMessage ? (
      <div className='error login-error'>{ this.props.errorMessage }</div>
    ) : (
      null // TODO: где-то читал что реакт.jsx должен возвращать <div> элемент! - но тут я никуя не возвращаю! - кули работает?
    );

    return (
      flashMessage
    );
  }
});
