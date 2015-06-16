'use strict';

var React = require('react');
var PostsList = require('./list.jsx');
var Post = require('./post.jsx');
var actions = require('../../actions/actions');

var PostStore = require('../../stores/PostStore');

module.exports = React.createClass({
  getInitialState: function() {
    return { data: [], loading: true };
  },

  componentDidMount: function() {
    this.readPostsFromAPI();
  },

  readPostsFromAPI: function() {
    var that = this;
    // use binding!
    actions.getPosts(function(posts){
      that.setState({
        data: posts,
        loading: false
      });
    });
  },

  render: function() {
    var postsBlock = this.state.loading ? (
      <div className='posts'>
        <div className='posts-preloader-wrapper'>
          <div className='preloader'></div>
        </div>
      </div>
    ) : (
      <div className='posts'>
        <PostsList data={ this.state.data }/>
      </div>
    );

    return (
      <div className='content full-width'>
        <label>Sort by</label>
        <select>
          <option>upvotes</option>
          <option>newest</option>
          <option>comments</option>
        </select>

        <hr />
        { postsBlock }
        <hr />

        <nav className='pagination'>
          <a className='next-page' href='#'>Load More Posts</a>
        </nav>
      </div>
    );
  }
});
