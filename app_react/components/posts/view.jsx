var React = require('react');
var PostsList = require('./list.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    this.readPostsFromAPI();
  },
  readPostsFromAPI: function() {
    this.props.readFromAPI('/posts.json', function(posts) {
      this.setState({ data: posts });
    }.bind(this));
  },
  render: function() {
    return (
      <div className='posts-view'>
        <PostsList data={this.state.data} />
      </div>
    );
  }
});
