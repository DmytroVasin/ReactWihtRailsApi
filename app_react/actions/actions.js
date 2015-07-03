'use strict';

var Reflux = require('reflux');

module.exports = Reflux.createActions([
    // user actions
    'login',
    'successLoggin',
    'unSuccessLoggin',
    'logout',
    'signUp',
    'successSignUp',
    'unSuccessSignUp',

    // static pages
    'getAbout',
    'getPosts',

    // posts
    'getPost',
    'createNewPost',
    'successCreatePost',
    'unSuccessCreatePost'
]);
