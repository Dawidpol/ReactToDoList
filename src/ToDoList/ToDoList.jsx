import React, { Component } from 'react';
import update from 'immutability-helper'; 
import './ToDoList.css';
import ToDo from './Components/ToDo'
import ToDoTitle from './Components/ToDoTitle'

const AddToDoForm = ({addToDo}) => {
  let input; 

  return (
        <form onSubmit={(e) => {
              e.preventDefault();
              addToDo(input.value);
              input.value = '';
            }
          }>
    <label className="add-to-do-label">Add to do:</label><input ref={node => {input = node;}} />
    <br />
  </form>
  );
}


class ToDoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      toDos: []
    }
    this.toDosCounter = 0;
    this.toDosIds = 0;
  }

  addToDo(title){
    const toDos = this.state.toDos;

    toDos.push({
      id: this.toDosIds++, 
      title: title,
      done: false
    });

    this.setState({
      toDos: toDos
    });

    this.toDosCounter++;
  }

  getToDoIndexById(id){
    const toDos = this.state.toDos;

    for(var i = 0; i < toDos.length; i += 1) {
        if(toDos[i].id === id) {
            return i;
        }
    }
  }


  remove(id){
    const toDos = this.state.toDos;

    var foundIndex = this.getToDoIndexById(id);

    this.state.toDos.splice(foundIndex, 1);

    this.setState({
      toDos: toDos
    });
    this.toDosCounter--;
  }

  markToDo(id){
    var foundIndex = this.getToDoIndexById(id);
    const toDo = this.state.toDos[foundIndex];

    if(toDo.done){
      this.setState({
        toDos: update(this.state.toDos, {[foundIndex]: {done: {$set: false}}})
      })
    }
    else{
      this.setState({
        toDos: update(this.state.toDos, {[foundIndex]: {done: {$set: true}}})
      })
    }

    return toDo;
  }

  render() {
    const listItemsNotDone = this.state.toDos.filter((toDo) => {return toDo.done === false;}).map((toDo) =>
      <li>
        <ToDo toDo={toDo} remove={this.remove.bind(this)} markToDo={this.markToDo.bind(this)}/>
      </li>
    );

    const listItemsDone = this.state.toDos.filter((toDo) => {return toDo.done === true;}).map((toDo) =>
      <li>
        <ToDo toDo={toDo} remove={this.remove.bind(this)} markToDo={this.markToDo.bind(this)}/>
      </li>
    );

    return (
      <div>
        <AddToDoForm addToDo={this.addToDo.bind(this)}/>
        <ToDoTitle toDosCounter={this.toDosCounter} />
        <ul className="to-do-list">
          {listItemsNotDone}
          {listItemsDone}
        </ul>
      </div>
    );
  }
}

export default ToDoList;