var React = require('react');
var router = require('./stores/RouteStore').getRouter();

router.run(function(Handler) {
  React.render(<Handler/>, document.getElementById('react'));
});
