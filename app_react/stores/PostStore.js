'use strict';

require('whatwg-fetch');
var Reflux = require('reflux');

var actions = require('../actions/actions');

var _posts = [];
var _createPostFlashMessage = '';
var _newPostId = null;
var _currentPost = null;
var _lastPage = null;

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(actions.getPost, this.onGetPost);
    this.listenTo(actions.getPosts, this.onGetPosts);
    this.listenTo(actions.createNewPost, this.onCreateNewPost);
    this.listenTo(actions.successCreatePost, this.onSuccessCreatePost);
    this.listenTo(actions.unSuccessCreatePost, this.onUnSuccessCreatePost);
  },

  getCreatePostFlash: function(){
    return _createPostFlashMessage;
  },

  getNewPostId: function(){
    return _newPostId;
  },

  setNewPostId: function(value){
    _newPostId = value;
  },

  posts: function(){
    return _posts;
  },

  currentPost: function(){
    return _currentPost;
  },

  pageIsLast: function(page){
    return _lastPage === page;
  },

  onGetPost: function(id) {
    fetch('/v1/posts/'+id, {
        headers: {
          'Authorization': sessionStorage.getItem('accessToken')
        }
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        if ( !data.error ){
          // _currentPost = data.post;
          // API подправить.
          _currentPost = data;
          this.trigger();
        }
      }.bind(this));
  },

  onGetPosts: function(currentPage) {
    var _currentPage = currentPage || 1;

    fetch('/v1/posts?page=' + _currentPage, {
      headers: {
        'Authorization': sessionStorage.getItem('accessToken')
      }
    }).then(function(response) {
        return response.json();
      }).then(function(data) {
        if ( data.error ){
          _createPostFlashMessage = data.error;
        } else {
          _lastPage = data['total_pages'];
          _posts = data['posts'];
        }

        this.trigger();
      }.bind(this));
  },

  onCreateNewPost: function(title, url) {
    fetch('/v1/posts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        post: {
          title: title,
          url: url
        }
      })
    }).then(function(response) {
      return response.json()
    }).then(function(data) {
      if (data.error){
        actions.unSuccessCreatePost(data.error);
        // unSuccessCreatePost(data.error);
        return;
      }

      actions.successCreatePost(data.id);
      // successCreatePost(data.id);
    })
    // }.bind(this))
  },

  onSuccessCreatePost: function(postId){
  // ПЕРЕПИСАТЬ!
  // successCreatePost: function(postId){
    _createPostFlashMessage = '';
    _newPostId = postId;
    this.trigger();
  },

  onUnSuccessCreatePost: function(errorMessage){
    _createPostFlashMessage = errorMessage;
    this.trigger();
  }
})
