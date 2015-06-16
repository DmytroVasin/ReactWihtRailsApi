var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='post cf'>
        <div className='post-link'>
          <a className='post-title'>{ this.props.title }</a>
          <span className='hostname'>
            <span>(</span>
            <a href='#'>{ this.props.url }</a>
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
    );
  }
});
