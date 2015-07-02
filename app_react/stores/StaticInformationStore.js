'use strict';

require('whatwg-fetch');
var Reflux = require('reflux');

var _aboutText = '';

module.exports = Reflux.createStore({
  getAbout: function(){
    return _aboutText;
  },

  fetchAbout: function(cb) {
    fetch('/v1/about')
      .then(function(response) {
        return response.json()
      }).then(function(data) {
        _aboutText = data.about_text;
        this.trigger();
      }.bind(this));
  }
});
