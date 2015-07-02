'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {

    // Сделать через hide/show - класс is-processing.

    var SignButton = this.props.processing ? (
      <button type='submit' className='button button-primary text-center'>
        <div className='spinner'>
          <div className='rect1'></div>
          <div className='rect2'></div>
          <div className='rect3'></div>
          <div className='rect4'></div>
          <div className='rect5'></div>
        </div>
      </button>
    ) : (
      <button type='submit' className='button button-primary text-center'>{ this.props.button_text }</button>
    )

    return (
      <div>{ SignButton }</div>
    );
  }
});
