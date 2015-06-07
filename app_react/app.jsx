var React = require('react');
var router = require('./stores/route_store.jsx').getRouter();

router.run(function(Handler) {
  React.render(<Handler/>, document.body);
});
