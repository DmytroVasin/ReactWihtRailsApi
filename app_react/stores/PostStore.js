'use strict';

require('whatwg-fetch');
var Reflux = require('reflux');

var actions = require('../actions/actions');

var _posts = [];
var _createPostFlashMessage = '';
var _newPost = null;
var _currentPost = null;

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

  getNewPost: function(){
    return _newPost;
  },

  setNewPost: function(value){
    _newPost = value;
  },

  posts: function(){
    return _posts;
  },

  currentPost: function(){
    return _currentPost;
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
          _currentPost = data;
          this.trigger();
        }
      }.bind(this));
  },

  onGetPosts: function() {
    fetch('/v1/posts', {
      headers: {
        'Authorization': sessionStorage.getItem('accessToken')
      }
    }).then(function(response) {
        return response.json()
      }).then(function(data) {
        if ( data.error ){
          _createPostFlashMessage = data.error;
        } else {
          _posts = data;
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
    }).then( function(response) {
      return response.json()
    }).then(function(data) {

      if (data.error){
        return actions.unSuccessCreatePost(data.error);
      }

      actions.successCreatePost(data);
    })
  },

  onSuccessCreatePost: function(newPost){
    // TODO: Правильный ли это подход для создания поста? - ебота какая-то получается? - слишком много движения для CRUD действий
    _createPostFlashMessage = '';
    _newPost = newPost;
    this.trigger();
  },

  onUnSuccessCreatePost: function(errorMessage){
    _createPostFlashMessage = errorMessage;
    this.trigger();
  }
})
