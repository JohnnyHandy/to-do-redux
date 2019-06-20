import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus,faTimesCircle,faPen, faArrowCircleRight, faArrowCircleLeft,faTimes,faLock,faAt } from '@fortawesome/free-solid-svg-icons';
import Layout from './containers/Layout/Layout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import classes from './App.module.css'

library.add(faPlus,faTimesCircle,faPen,faArrowCircleRight,faArrowCircleLeft,faTimes,faLock,faAt);

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup()
  }

  // state ={
  //   background:undefined
  // }
  // componentWillMount(){
  //   let backgroundArray=[
  //     'https://images.pexels.com/photos/2373497/pexels-photo-2373497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     'https://images.pexels.com/photos/2373495/pexels-photo-2373495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     'https://images.pexels.com/photos/2252315/pexels-photo-2252315.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     'https://images.pexels.com/photos/1853372/pexels-photo-1853372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     'https://images.pexels.com/photos/1901033/pexels-photo-1901033.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     'https://images.pexels.com/photos/2019571/pexels-photo-2019571.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     'https://images.pexels.com/photos/1834396/pexels-photo-1834396.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     'https://images.pexels.com/photos/2287500/pexels-photo-2287500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     'https://images.pexels.com/photos/2287506/pexels-photo-2287506.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     'https://images.pexels.com/photos/2087392/pexels-photo-2087392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      
  // ]
  //   const random = backgroundArray[Math.floor(Math.random()*backgroundArray.length)]

  //   return this.setState({background: random})
  // }


  render() {

    
    return (
      <div className={classes.div}>
        <Layout/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    onTryAutoSignup:()=>dispatch(actions.authCheckState())
  }
}

export default connect(null,mapDispatchToProps)(App);
