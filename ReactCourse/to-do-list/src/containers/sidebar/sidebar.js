import React from 'react'

import classes from './sidebar.css'
import List from '../../components/List/List'



const sidebar = (props)=>{
    
    return(
        <div className={classes.sidebar}>
            <h4>SideBar</h4>
            <List 
            itemData = {props.itemData}
            indexInfo={props.indexInfo}></List>
            
        </div>
        )
}

export default sidebar