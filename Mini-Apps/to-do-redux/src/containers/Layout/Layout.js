import React, {Component} from 'react'
import {Container, Card, CardGroup} from 'reactstrap'


import Sidebar from './Sidebar/Sidebar'
import Info from './Info/Info'
import classes from './Layout.module.css'

class Layout extends Component{

    render(){
        return(
            <Container className={classes.Layout}>
                <h1>To-Do-List</h1>
                <CardGroup>
                    <Card className={classes.sideBar}>
                        <Sidebar/>
                    </Card>
                    <Card>
                        <Info
                        className={classes.Info}/>
                    </Card>
                </CardGroup>
            </Container>
        )
    } 
}

export default Layout