'use strict';

var React = require('react');
var PostsList = require('./list.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },
  render: function() {
    return (
      <div className='posts-view'>
        <PostsList data={this.state.data} />
      </div>
    );
  }
});
