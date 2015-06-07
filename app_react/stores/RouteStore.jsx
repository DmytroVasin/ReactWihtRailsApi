var Router = require('react-router');
var routes = require('../routes.jsx');
var assign = require('object-assign');


var router = Router.create(routes, Router.HistoryLocation)

var RouteStore = assign({}, {
  getRouter: function() {
    return router;
  }
});

module.exports = RouteStore;
