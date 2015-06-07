var request = require('superagent');

var ServerActionCreators = require('../actions/ServerActionCreators.jsx');

module.exports = {
  login: function(email, password) {
    // request.post(APIEndpoints.LOGIN) - заменить!!
    request.post('/v1/login')
      .field('user[email]', email)
      .field('user[password]', password)
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            // var errorMsgs = _getErrors(res);
            // ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  }
}
