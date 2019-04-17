import React, {Component} from 'react'
import {Container, Card, CardGroup} from 'reactstrap'

import Sidebar from './Sidebar/Sidebar'
import Info from './Info/Info'

class Layout extends Component {
    render(){
        return(
            <Container>
                <h1>To-Do-List</h1>
                <CardGroup>
                    <Card>
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