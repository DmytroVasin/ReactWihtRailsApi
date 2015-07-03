var React = require('react');
var Post = require('./post.jsx');

module.exports = React.createClass({
  render: function() {
    var posts = this.props.data.map(function(post) {
      return (
        <Post key={post.id} id={post.id} title={post.title} body={post.body} url={post.url} author_name={post.author_name} />
      );
    });

    return (
      <ul className='posts-list'>
        {posts}
      </ul>
    );
  }
});
