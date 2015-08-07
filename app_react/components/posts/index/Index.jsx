'use strict';

var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;

var PostsList = require('./list.jsx');

var actions = require('../../../actions/actions');

var PostStore = require('../../../stores/PostStore');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin, Navigation],

  getInitialState: function() {
    return {
      data: [],
      // data: PostStore.posts(),
      loading: true,//должно идти со стора!
      currentPage: 1,
      lastPage: false
    };
  },

  componentDidMount: function() {
    this.listenTo(PostStore, this._onChange);
    actions.getPosts(this.state.currentPage);
  },

  _onChange: function(){
    if ( PostStore.getCreatePostFlash() ){
      this.replaceWith('/login');
      // проверить здесь ретур!
      // debugger;
    };

    if ( PostStore.pageIsLast(this.state.currentPage) ){
      this.setState({
        lastPage: true
      });
    }

    // перенести формирование данных в стор - что бы стор возвращал посты для страницы
    var _data = this.state.data.concat( PostStore.posts() );
    this.setState({
      data: _data,
      loading: false
    });

    // hideLoader()
  },

  // Хелпер метод - !
  // hideLoader: function(){
  //   setState({
  //     loading: false;
  //   })
  // }

  getNextPagePosts: function(){
    var _currentPage = this.state.currentPage + 1;
    this.setState({ currentPage: _currentPage });

    actions.getPosts( _currentPage );
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

    var pagination = this.state.lastPage ? (
      null
    ) : (
      <nav className='pagination'>
        <a className='next-page' href='#' onClick={this.getNextPagePosts} >Load More Posts</a>
      </nav>
    )

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

        { pagination }
      </div>
    );
  }
});
