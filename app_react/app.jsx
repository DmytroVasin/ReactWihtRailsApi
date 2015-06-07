var React = require('react');
var router = require('./stores/RouteStore.jsx').getRouter();

router.run(function(Handler) {
  React.render(<Handler/>, document.body);
});
