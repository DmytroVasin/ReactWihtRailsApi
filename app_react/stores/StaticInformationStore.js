'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(actions.getAbout, this.onGetAbout);
  },

  onGetAbout: function(cb) {
    request.get('/v1/about')
      .set('Accept', 'application/json')
      .end(function(error, res){
        // кули у мнея error всегда пустой?
        // нахуй прокидывать колбеки - если можно дернуть триггер ?
        if (res && !res.error){ // можно ли тут юзнуть res.ok?
          cb( JSON.parse(res.text).about_text );
        };
      });
  }
});
