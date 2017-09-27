import React, { Component } from 'react';

class ToDoTitle extends Component{
    constructor(props){
    super(props);

    this.toDosCounter = props.toDosCounter;
  }

  render(){
      return (
        <h2 className="to-do-title">To Do ({this.toDosCounter}):</h2>
      )
  }
}

export default ToDoTitle;