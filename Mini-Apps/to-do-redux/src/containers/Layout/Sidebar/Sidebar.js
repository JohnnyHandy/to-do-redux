import React from 'react'

import classes from './Sidebar.module.css'
import {Card} from 'reactstrap'
import List from '../../../components/List/List'

const Sidebar = (props)=>{
    return(  
        <Card className={classes.sidebar}>
            <List
            className={classes.List}/>
        </Card>
    )
}

export default Sidebar
