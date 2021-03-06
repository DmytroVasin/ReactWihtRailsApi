var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var App = require('./components/layout/application.jsx');
var AboutPage = require('./components/static/AboutPage.jsx');
var LoginPage = require('./components/session/LoginPage.jsx');
var SignUpPage = require('./components/registrations/SignUpPage.jsx');

var PostsIndex = require('./components/posts/index/Index.jsx');
var PostsNew = require('./components/posts/new/New.jsx');
var PostShow = require('./components/posts/show/Show.jsx');


module.exports = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='posts' handler={PostsIndex} />
    <Route name='about' handler={AboutPage} />
    <Route name='login' path='/login' handler={LoginPage} />
    <Route name='signup' path='/signup' handler={SignUpPage} />
    <Route name='post_new' path='/posts/new' handler={PostsNew} />
    <Route name='post_show' path='/posts/:id' handler={PostShow} />
  </Route>
);
