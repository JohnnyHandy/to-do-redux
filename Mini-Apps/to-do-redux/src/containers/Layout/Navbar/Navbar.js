import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar,NavbarBrand,Nav,NavLink,NavItem,Button} from 'reactstrap'
import classes from './Navbar.module.css'

import * as actionTypes from '../../../store/actions/index'

class navbar extends Component{
    render(){
        return(
            <Navbar color = 'light'>
                <NavbarBrand>To-do-redux</NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavLink onClick={this.props.toggleModal} className={classes.navLink} >
                            <Button>Authentication</Button>
                            </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        toggleModal:()=>dispatch(actionTypes.toggleModal())
    }
}


export default connect(null,mapDispatchToProps)(navbar)
