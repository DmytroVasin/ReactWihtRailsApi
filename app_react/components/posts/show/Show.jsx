'use strict';

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/actions');

var PostStore = require('../../../stores/PostStore');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return { data: [], loading: true };
  },

  componentDidMount: function() {
    this.listenTo( PostStore, this._onChange );
    actions.getPost( this.props.params.id );
  },

  _onChange: function(){
    // смотри на index - как там сделано
    this.setState({
      data: PostStore.currentPost(),
      loading: false
    });
  },

  render: function() {
    var postBlock = this.state.loading ? (
      <div className='post cf'>
        <div className='posts-preloader-wrapper'>
          <div className='preloader'></div>
        </div>
      </div>
    ) : (
      <div className='post cf'>
        <div className='post-link'>
          <span className='post-title'>{ this.state.data.title }</span>
          <span className='hostname'>
            <span>(</span>
            <a href={ this.state.data.url }>{ this.state.data.url }</a>
            <span>)</span>
          </span>
        </div>

        <div className='post-info'>
          <p> { this.state.data.body } </p>
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
              <a href='#'>{ this.state.data.author_name }</a>
            </span>
            <span className='post-info-item'>{ this.state.data.strf_created_at }</span>
            <span className='post-info-item'>
              <a href='#'>20 comments</a>
            </span>
          </div>
        </div>
      </div>
    )

    return (
      <div className='content full-width'>
        { postBlock }
      </div>
    )
  }
});
