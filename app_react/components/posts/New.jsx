'use strict';

var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;

var PostStore = require('../../stores/PostStore');

var SignButton = require('../shared/SignButton.jsx');
var FlashMessage = require('../shared/FlashMessage.jsx');

var actions = require('../../actions/actions');

function getStateFromStores() {
  return {
    post_new_error_message: PostStore.getCreatePostFlash(),
    processing: false
  };
}

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin, Navigation],

  getInitialState: function() {
    return getStateFromStores();
  },

  _onSubmit: function(e){
    e.preventDefault();

    var title = this.refs.title.getDOMNode().value.trim();
    var url = this.refs.url.getDOMNode().value.trim();

    this.setState({ processing: true });

    actions.createNewPost(title, url);
  },


  componentDidMount: function() {
    this.listenTo(PostStore, this._onChange);
  },

  _onChange: function(){
    var newPost = PostStore.getNewPost()

    if( PostStore.getNewPost() ){
      PostStore.setNewPost = null;
      this.replaceWith('/posts/' + newPost.id);
    } else {
      this.refs.title.getDOMNode().value = '';
      this.refs.url.getDOMNode().value = '';
    }

    this.setState( getStateFromStores() );
  },

  render: function() {
    // TODO: Как сделать затемнения и переходы - как в примере: http://henleyedition.com/react-news/
    // Типо открываеться в попапе и меняеться URL.
    return (
      <div className='new-post md-modal'>
        <form className='new-post-form' onSubmit={this._onSubmit}>
          <h1 className='text-center'>New Post</h1>

          Title
          <br />
          <input type='text' placeholder='Title' ref='title' />

          Link
          <br />
          <input type='url' placeholder='url' ref='url' />

          <SignButton processing={this.state.processing} button_text='Create Post' />
        </form>

        <FlashMessage errorMessage = {this.state.post_new_error_message} />
      </div>
    );
  }
});
