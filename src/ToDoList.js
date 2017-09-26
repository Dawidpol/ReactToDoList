import React, { Component } from 'react';
import './ToDoList.css';

const ToDoTitle = ({toDosCounter}) => {
  return (
    <h2 className="to-do-title">To Do ({toDosCounter}):</h2>
  );
}

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

const ToDo = ({toDo, remove}) => {
  return (
    <div className="to-do" >
      <p>{toDo.title}</p>
      <button onClick={() => remove(toDo.id)}>Remove</button>
    </div>
  )
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
      title: title
    });

    this.setState({
      toDos: toDos
    });

    this.toDosCounter++;
  }

  remove(id){
    const toDos = this.state.toDos;
    var foundIndex;

    for(var i = 0; i < toDos.length; i += 1) {
        if(toDos[i].id === id) {
            foundIndex = i;
            break;
        }
    }

    this.state.toDos.splice(foundIndex, 1);

    this.setState({
      toDos: toDos
    });

    this.toDosCounter--;
  }

  render() {
    const listItems = this.state.toDos.map((toDo) =>
      <li>
        <ToDo toDo={toDo} remove={this.remove.bind(this)} />
      </li>
    );

    return (
      <div>
        <AddToDoForm addToDo={this.addToDo.bind(this)}/>
        <ToDoTitle toDosCounter={this.toDosCounter} />
        <ul className="to-do-list">
          {listItems}
        </ul>
      </div>
    );
  }
}
export default ToDoList;