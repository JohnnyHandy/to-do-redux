import React, {Component} from 'react'

import classes from './Sidebar.module.css'
import {Card} from 'reactstrap'
import List from '../../../components/List/List'
import Tab from './Navigation/Tabs'

class Sidebar extends Component{
    render(){

        

        return(
            <Card className={classes.sidebar}>
                <Tab />
                <List
                className={classes.List}/>
            </Card>
        )
    }
}
export default Sidebar
