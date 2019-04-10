import React, {Component} from 'react'
import {Container,Card,CardGroup} from 'reactstrap'

import classes from './Layout.module.css'
import Sidebar from './sidebar/sidebar'
import Info from './Info/Info'

class Layout extends Component{
    
    render(){
        return(
            <Container className={classes.Layout}>
                <h1>To-Do-List</h1>
                <CardGroup>
                    <Card className={classes.cardgroup}>
                        <Sidebar/>
                    </Card>
                    <Card>
                        <Info/>
                    </Card>
                </CardGroup>
            </Container>
        )
    } 
}

export default Layout