import React, {Component} from 'react'
import {Container, Card, CardGroup} from 'reactstrap'


import Sidebar from './Sidebar/Sidebar'
import Info from './Info/Info'
import classes from './Layout.module.css'
import Navbar from './Navbar/Navbar'
import Modal from './Modal/Modal'

class Layout extends Component{

    render(){
        return(
            <Container className={classes.Layout}>
                <Navbar/>
                <Modal></Modal>
                <CardGroup>
                    <Card >
                        <Sidebar />
                    </Card>
                    <Card >
                        <Info/>
                    </Card>
                </CardGroup>
            </Container>
        )
    } 
}

export default Layout