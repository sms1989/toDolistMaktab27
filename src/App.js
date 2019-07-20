import React,{Component} from 'react';
import "./App.css";

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      toDo: '',
      toDoList: [],
      doneList: []
    }
  }

  submitHandler = (event) =>{
    event.preventDefault();
    const {toDoList,toDo} = this.state; // const toDoList = this.state.toDoList;
    this.setState({
      toDoList:[...toDoList, {text:toDo, id:new Date().getTime()}],
      toDo: ''
    })
  }

  changeHandler = (event) =>{
    const {name,value} = event.target;
    this.setState({[name]: value});
  }

  // deleteHandler = (id) =>{
  //   return ()=>{
      
  //   }
  // }

  deleteHandler = id => ()=> {
    const {toDoList} = this.state;
    const idx = toDoList.findIndex(toDo=>toDo.id === id);
    toDoList.splice(idx,1);
    this.setState({toDoList});
  }

  checkBoxChange = (event) =>{
    const {checked} = event.target;
    if (checked) {
      const id = event.target.getAttribute('data-id');
      const {toDoList,doneList} = this.state; // const toDoList = this.state.toDoList;
      const idx = toDoList.findIndex(toDo=>toDo.id == id);
      const done = toDoList.splice(idx,1);
      this.setState({
        toDoList,
        doneList: [...doneList,...done]
      })
    } else {
      const id = event.target.getAttribute('data-id');
      const {toDoList,doneList} = this.state; // const toDoList = this.state.toDoList;
      const idx = doneList.findIndex(toDo=>toDo.id == id);
      const done = doneList.splice(idx,1);
      this.setState({
        doneList,
        toDoList: [...toDoList,...done]
      })
    }
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems:'center',flexDirection: 'column',width: 400,margin:'auto'}}>
        <h1>Keep List</h1>
        <form style={{display:'flex',width:'100%'}} onSubmit={this.submitHandler}>
          <input onChange={this.changeHandler} value={this.state.toDo} type="text" name="toDo" placeholder="toDo" className="input"/>
          <button type="submit" disabled={!this.state.toDo}>Add</button>
        </form>
        <ul className="toDo-list">
          {this.state.toDoList.map(toDo=><li className="toDo-item" key={toDo.id}>
            <input type="checkbox" data-id={toDo.id} onChange={this.checkBoxChange} />
            <span>{toDo.text}</span>
            <button onClick={this.deleteHandler(toDo.id)} >X</button>
          </li>)}
        </ul>
        <ul className="toDo-list">
          {this.state.doneList.map(toDo=><li className="toDo-item" key={toDo.id}>
            <input type="checkbox" data-id={toDo.id} onChange={this.checkBoxChange} checked />
            <span>{toDo.text}</span>
          </li>)}
        </ul>
      </div>
    )
  }
}