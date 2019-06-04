import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,Button} from 'reactstrap'
import classes from './Navbar.module.css'

import * as actionTypes from '../../../store/actions/index'

class navbar extends Component{
    constructor(props) {
        super(props);
      this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleButtonClick() {
        console.log(document.activeElement);
        this.buttonDOM.blur();
        console.log(document.activeElement);
      }
    render(){
        let authButton = this.props.isAuthenticated ? 
            <Button  className={classes.navLink} onClick={this.props.logout} type="button">Logout</Button>:
            <Button  className={classes.navLink} onClick={this.props.toggleModal} type="button">Authentication</Button>

        return(
            <Navbar color = 'light'>
                <NavbarBrand>To-do-redux</NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavLink >
                            {authButton}
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        isAuthenticated:state.auth.token !==null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        toggleModal:()=>dispatch(actionTypes.toggleModal()),
        logout:()=>dispatch(actionTypes.logout())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(navbar)
