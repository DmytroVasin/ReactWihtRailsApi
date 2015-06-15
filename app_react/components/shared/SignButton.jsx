'use strict';

// - Нужно ли везде использовать 'use strict' или стоит один раз заюзать и будет норм.
// - МОЖЕТ НАХУЙ НАМ ВООБЩЕ РОУТЕР ?
// - Как компилить less в webpack?

var React = require('react');

module.exports = React.createClass({
  render: function() {
    // на сколько нужно дробить компоненты? пока дробяться - дробить или по своим очучениям?
    // Как правильно дробить sign-in/sign up box with button and spinner? button отдельная компонента - и спиннер отдельная ? или это как сделал я сейчас?
    // все в одной компоненте?

    var SignInButton = this.props.processing ? (
      <button type='submit' className='button button-primary text-center'>
        <div className='spinner'>
          <div className='rect1'></div>
          <div className='rect2'></div>
          <div className='rect3'></div>
          <div className='rect4'></div>
          <div className='rect5'></div>
        </div>
      </button>
    ) : (
      <button type='submit' className='button button-primary text-center'>{ this.props.button_text }</button>
    )

    return (
      <div>{ SignInButton }</div>
    );
  }
});
