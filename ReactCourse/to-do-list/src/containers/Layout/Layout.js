import React, {Component} from 'react'

import classes from './Layout.css'
import Sidebar from '../sidebar/sidebar'
import Info from '../Info/Info'

class Layout extends Component {
    
    state={
        itemInfo:[],
        indexInfo:0
    }
    
    addItemInfo = (value)=> {
        this.setState({itemInfo:value})
        }
    setIndexInfo = (index)=>{
        this.setState({indexInfo:index})
    }    
    
    
        
    render(){
    // let layoutCheck = null
    // let itemInfoLength=this.state.itemInfo.length
    // if(itemInfoLength>0){
    // layoutCheck=(
    //     this.state.itemInfo.map(i=>{
    //     return <div key={i.id}>
    //             <h5>itemName=>{i.itemName}</h5>
    //             <h5>itemDesc=>{i.itemDesc}</h5>
    //             <h5>id=>{i.id}</h5>
    //             </div>
    //             })
    //     )
    //     // for(let keys of this.state.itemInfo){
            
        
    // }
    
        
        return(
            <div className={classes.Layout}>
                <h1 className={classes.title}>To-do List</h1>
                <div>
                    <Info 
                    itemInfo={this.state.itemInfo}
                    indexInfo={this.state.indexInfo}/>
                    <Sidebar 
                    itemData={this.addItemInfo.bind(this)}
                    indexInfo={this.setIndexInfo.bind(this)}/>
                    {/*<h2>Layout State: {this.state.indexInfo}</h2>}
                    {layoutCheck*/}
                </div>
                
            </div>
            )
    }
}

export default Layout