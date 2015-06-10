'use strict';

var React = require('react');
var Reflux = require('reflux');

var RouteHandler = require('react-router').RouteHandler;
var LoginStore = require('../../stores/LoginStore');

var Menu = require('./menu.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: LoginStore.isLoggedIn(),
    email: LoginStore.getEmail()
  };
}

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],
  // mixins: [
  //   Reflux.listenTo(LoginStore, '_onChange')
  // ],

  getInitialState: function() {
    return getStateFromStores();
  },

  _onChange: function() {
    this.setState( getStateFromStores() );
  },

  componentDidMount: function() {
    // ---- Какой из этих методов следует юзать?

    // var that = this; // remove that!
    // LoginStore.listen(function() {
    //   that._onChange();
    // })
    this.listenTo(LoginStore, this._onChange);
  },

  render: function () {
    return (

      <div id='app' className='full-height'>

        <div className='wrapper full-height'>
          <Menu isLoggedIn={this.state.isLoggedIn} email={this.state.email} />

          <main id='content' className='full-height inner'>
            <div className='content full-width'>
              <label>Sort by</label>
              <select>
                <option>upvotes</option>
                <option>newest</option>
                <option>comments</option>
              </select>

              <hr />
              <div className='posts'>
                <div className='post cf'>
                  <div className='post-link'>
                    <a className='post-title' href='#'>RefluxJs News</a>
                    <span className='hostname'>
                      <span>(</span>
                      <a href='#'>github.com</a>
                      <span>)</span>
                    </span>
                  </div>
                  <div className='post-info'>
                    <div className='posted-by'>
                      <a className='upvote'>
                        <span>616</span>
                        <span> </span>
                        <i className='fa fa-arrow-up'>
                        </i>
                      </a>
                      <span className='post-info-item'>
                        <a href='#'>Trytest</a>
                      </span>
                      <span className='post-info-item'>2 months ago</span>
                      <span className='post-info-item'>
                        <a href='#'>5 comments</a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='post cf'>
                  <div className='post-link'>
                    <a className='post-title'>I Smell Like Beef</a>
                    <span className='hostname'>
                      <span>(</span>
                      <a href='#'>www.youtube.com</a>
                      <span>)</span>
                    </span>
                  </div>
                  <div className='post-info'>
                    <div className='posted-by'>
                      <a className='upvote'>
                        <span>90</span>
                        <span> </span>
                        <i className='fa fa-arrow-up'>
                        </i>
                      </a>
                      <span className='post-info-item'>
                        <a href='#'>echenley</a>
                      </span>
                      <span className='post-info-item'>6 months ago</span>
                      <span className='post-info-item'>
                        <a href='#'>20 comments</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <nav className='pagination'>
                <a className='next-page' href='#'>Load More Posts</a>
              </nav>
            </div>
          </main>

          <RouteHandler readFromAPI={this.readFromAPI} />
        </div>
      </div>
    );
  }
});
