import React, {Component} from 'react'
import {Container, Card, CardGroup} from 'reactstrap'
import {connect} from 'react-redux'


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
                        className={classes.Info}
                        itemData={this.props.items}
                        itemIndex={this.props.itemIndex}/>
                    </Card>
                </CardGroup>
            </Container>
        )
    } 
}

const mapStateToProps = state =>{
    return{
        items:state.items,
        itemIndex:state.itemIndex
    }
}

export default connect(mapStateToProps)(Layout)