var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.jsx');

LoginPage = React.createClass({
  _onSubmit: function(e){
    e.preventDefault();

    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    SessionActionCreators.login(email, password);
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <div>
            <label name='email'>Email</label>
            <input type='text' name='email' ref='email' />
          </div>

          <div>
            <label name='password'>Password</label>
            <input type='password' name='password' ref='password' />
          </div>

          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }
});

module.exports = LoginPage;
