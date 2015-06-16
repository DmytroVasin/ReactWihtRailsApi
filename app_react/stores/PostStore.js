'use strict';

// ДОХУЯ у нас сторов!

var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(actions.getPosts, this.onGetPosts);
  },

  onGetPosts: function(cb) {
    request.get('/v1/posts')
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res && !res.error){
          cb( JSON.parse(res.text) );
        };
      });
  }
});
