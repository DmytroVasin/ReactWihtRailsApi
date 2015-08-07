'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    if (!this.props.errorMessage) {
      return null;
    }

    return (
      <div className='error login-error'>{ this.props.errorMessage }</div>
    );
  }
});
