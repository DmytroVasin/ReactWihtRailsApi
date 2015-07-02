'use strict';

require('whatwg-fetch');
var Reflux = require('reflux');

var actions = require('../actions/actions');

var posts = [];

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(actions.getPosts, this.onGetPosts);
  },

  posts: function(){
    return posts;
  },

  onGetPosts: function(cb) {
    fetch('/v1/posts')
      .then(function(response) {
        return response.json()
      }).then(function(data) {
        if ( !data.error ){
          posts = data;
          this.trigger();
        }
      }.bind(this));
  }
});
