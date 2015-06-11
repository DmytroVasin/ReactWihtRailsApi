var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var App = require('./components/layout/application.jsx');
var PostsView = require('./components/posts/view.jsx');
var AboutView = require('./components/static/about_view.jsx');
var LoginPage = require('./components/session/LoginPage.jsx');
var SignUpPage = require('./components/registrations/SignUpPage.jsx');


module.exports = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='posts' handler={PostsView} />
    <Route name='about' handler={AboutView} />
    <Route name='login' path='/login' handler={LoginPage} />
    <Route name='signup' path='/signup' handler={SignUpPage} />
  </Route>
);
