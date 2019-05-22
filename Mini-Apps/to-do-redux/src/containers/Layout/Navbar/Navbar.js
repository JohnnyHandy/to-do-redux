import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar,NavbarBrand,Nav,NavLink,NavItem} from 'reactstrap'

import * as actionTypes from '../../../store/actions/index'

class navbar extends Component{
    render(){
        let modalType = ''
        return(
            <Navbar color = 'light'>
                <NavbarBrand>To-do-redux</NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavLink onClick={()=>{
                            modalType = 'Sign In'
                            this.props.toggleModal(modalType)
                        }} >
                            Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={()=>{
                            modalType = 'Sign Up'
                            this.props.toggleModal(modalType)
                        }}>Register</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        toggleModal:(modalType)=>dispatch(actionTypes.toggleModal(modalType))
    }
}


export default connect(null,mapDispatchToProps)(navbar)
