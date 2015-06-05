var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <li className='post'>
        <span className='post-text'>{this.props.title}</span>,
        <span className='post-text'>{this.props.body}</span>,
        <span className='post-text'>{this.props.url}</span>
      </li>
    );
  }
});
