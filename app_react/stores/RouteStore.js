'use strict';

var Router = require('react-router');
var routes = require('../routes.jsx');


var router = Router.create(routes, Router.HistoryLocation)

module.exports = {
  getRouter: function() {
    return router;
  }
};
