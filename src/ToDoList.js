import React, { Component } from 'react';


const AddToDoForm = ({addToDo}) => {
    let input; 

    return (
    <form onSubmit={(e) => {
              e.preventDefault();
              addToDo(input.value);
              input.value = '';
            }
          }>

      <input ref={node => {input = node;}} />
      <input type="submit" value="Submit"/>
      <br />
</form>
    );
}

const ToDo = ({toDo, remove}) => {
  return (
    <div>
      {toDo.title}
      <button onClick={() => remove(toDo.id)}>Remove</button>
    </div>
  )
}

class ToDoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      toDos: [{title: 'test', id: -1}]
    }
    this.toDosCounter = 0;
  }

  addToDo(title){
    const toDos = this.state.toDos;

    toDos.push({
      id: this.toDosCounter++, 
      title: title
    });

    this.setState({
      toDos: toDos
    });
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
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}
export default ToDoList;