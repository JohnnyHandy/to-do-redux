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
                <CardGroup className={classes.sidebar}>
                    <Card className={classes.sidebar}>
                        <Sidebar className={classes.sidebar}/>
                    </Card>
                    <Card className={classes.borders}>
                        <Info className={classes.borders}/>
                    </Card>
                </CardGroup>
            </Container>
        )
    } 
}

export default Layout