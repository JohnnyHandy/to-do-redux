import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './components/UserInput';
import UserOutput from './components/UserOutput';

class App extends Component {
  
  state ={
    userOutput:[
      {username:'Ronie'}
      ]
    
  }
  
  usernameHandler=()=>{
    // Don't do this => this.state.userOutPut[0].username='Marguie'
    this.setState({
      userOutput:[
        {username:'Marguie'}
        ]
    })
  }
  
  nameChangedHandler =(event) => {
     this.setState({
      userOutput:[
        {username:event.target.value}
        ]
    })
  };
  
    
  
  render() {
    
    const style ={
      backgroundColor:'white',
      font:'inherit',
      border:'1x solid blue',
      padding:'8px',
      cursor:'pointer'
    };
    return (
      <div className="App">
        <p> This is Task one </p>
        <button style={style}  onClick={this.usernameHandler}> Switch User Output Name </button>
        <UserOutput
         username={this.state.userOutput[0].username}  />
         <UserInput  username={this.state.userOutput[0].username} changed={this.nameChangedHandler} />
      </div>
    );
  }
}

export default App;
