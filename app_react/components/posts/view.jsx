'use strict';

var React = require('react');
var PostsList = require('./list.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },
  render: function() {
    return (
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
    );
  }
});

// render: function() {
//   return (
//     <div className='posts-view'>
//       <PostsList data={this.state.data} />
//     </div>
//   );
// }
