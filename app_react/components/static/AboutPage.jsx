'use strict';

var React = require('react');
// var Reflux = require('reflux');

var actions = require('../../actions/actions');
// var StaticInformationStore = require('../../stores/StaticInformationStore');


module.exports = React.createClass({
  // mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      loading: true,
      about_text: ''
    };
  },

  // логично ли было бы это держать внутри React.createClass - если да - то как?
  // Какие функции надо держаит внутри а какие снаружи?

  //------------------------
  // перенести к постам!
  // Что делать если апишка долго ничего не возвратила или вообще провалилась ? то какое действие логично?
  // 1-редирект
  // 2-сообщение об ошибке ( какое сообщение на примере страницы about )
  // Логичто было бы выдавать 404 типо страницы не существует - типо если недопустимый черт заходит и тут херакс....
  //------------------------


  componentDidMount: function() {
    // debugger;
    // this.listenTo(StaticInformationStore, this._onChange);
    var that = this;
    actions.getAbout(function(about_text){
      // debugger;
      // Бло криво как-то, через триггеры то лучше.
      that.setState({
        loading: false,
        about_text: about_text
      });
    }); // ???? правильно ли это ? если я сразу захочу получить инфу с сервера - как мне это сделать ?
  },

  // _onChange: function(){
  //   debugger;
  //   // this.setState(  );
  // },


  render: function() {
    // какого хуя не срабатывает?
    var Container = this.state.loading ? (
      <div className='preloader'></div>
    ) : (
      <p>{ this.state.about_text }</p>
    )

    return (
      <div id='about-view'>
        <h1>About</h1>
        { Container }
      </div>
    );
  }
});
