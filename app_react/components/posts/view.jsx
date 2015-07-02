'use strict';

var React = require('react');
var Reflux = require('reflux');

var PostsList = require('./list.jsx');
var Post = require('./post.jsx');
var actions = require('../../actions/actions');

var PostStore = require('../../stores/PostStore');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return { data: [], loading: true };
  },

  componentDidMount: function() {
    // TODO: Разве это норм подход? один колбек решил бы все проблемы
    // а тут мы делаем запрос на компонент дид моунт - вешаем листенер на триггер
    // в сторе создаем отдельную локальную переменную/геттер
    // добавляем onChange...

    this.listenTo(PostStore, this._onChange);
    this.readPostsFromAPI();
  },

  readPostsFromAPI: function() {
    actions.getPosts();
  },

  _onChange: function(){
    this.setState({
      data: PostStore.posts(),
      loading: false
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
