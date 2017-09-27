import React, { Component } from 'react';
import './ToDo.css'
class ToDo extends Component{
    constructor(props){
    super(props);

    this.toDo = props.toDo;
    this.remove = props.remove;
    this.markToDo = props.markToDo;

    this.state = {
      done: this.toDo.done
    }
  }

  render(){
      return (
        <div className="to-do" >
          <p className={this.state.done ? 'mark-done' : null}>{this.toDo.title}</p>
          <button onClick={() => this.markToDo(this.toDo.id)}>{this.state.done ? 'Not Done' : 'Done'}</button>
          <button onClick={() => this.remove(this.toDo.id)}>Remove</button>
        </div>
      )
  }
}

export default ToDo;