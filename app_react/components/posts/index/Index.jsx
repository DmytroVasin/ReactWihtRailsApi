'use strict';

var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;

var PostsList = require('./list.jsx');

var actions = require('../../../actions/actions');

var PostStore = require('../../../stores/PostStore');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin, Navigation],

  // this.context.router.getCurrentQuery().pages
  getInitialState: function() {
    return {
      data: [],
      loading: true,
      currentPage: 1,
      lastPage: false
    };
  },

  componentDidMount: function() {


    // TODO: Разве это норм подход? один колбек решил бы все проблемы
    // а тут мы делаем запрос на компонент дид моунт - вешаем листенер на триггер
    // в сторе создаем отдельную локальную переменную/геттер
    // добавляем onChange...

    this.listenTo(PostStore, this._onChange);
    actions.getPosts(this.state.currentPage);
  },

  _onChange: function(){
    if ( PostStore.getCreatePostFlash() ){
      // TODO: тупо как-то тут проверять - так как старница все равно отрисовуеться ( хоть и без данных )
      // поставить ответ от сервера большим - тогда долго будет редиректить...
      this.replaceWith('/login');
    };

    // TODO: Два раза SetState был - это вообще нормально ???
    if ( PostStore.pageIsLast(this.state.currentPage) ){
      this.setState({
        lastPage: true
      });
    }

    var _data = this.state.data.concat( PostStore.posts() );
    this.setState({
      data: _data,
      loading: false
    });
  },

  getNextPagePosts: function(){
    // TODO: не обновляет сразу!!!
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

// TODO: СДЕЛАТЬ НОРМА ПАГИНАААААЦИИЮ
