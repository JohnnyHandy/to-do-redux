import React, {Component} from 'react'
import {TabContent,TabPane,Nav, NavItem, NavLink} from 'reactstrap'
import {connect} from 'react-redux'

import classes from './Tab.module.css'
import * as actions from '../../../../store/actions/index'


class Tabs extends Component{
        render(){
            const tabItems = [
                {
                    name:'Short Term',
                    id:1
                },
                {
                    name:'Mid Term',
                    id:2
                },
                {
                    name:'Long Term',
                    id:3
                }
            ]
        
            const navItems = tabItems.map((i,index)=>{
                return (
                    <NavItem key={index} onClick={()=>this.props.onClickTab(i.id)}>
                        <NavLink>
                            {i.name}
                        </NavLink>
                    </NavItem>
                )
            })
            
        
            return(
                <React.Fragment>
                    <Nav tabs className={classes.tab}>
                        {navItems}
                    </Nav>
                    <TabContent>
                        <TabPane>
                            Content
                        </TabPane>
                    </TabContent>
                </React.Fragment>
                
            )
    }
    
}

   
const mapStateToProps = (state)=>{
    return state
}

const mapDispatchToProps = dispatch=>{
    return{
        onClickTab:(index)=>dispatch(actions.setActiveTab(index))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Tabs)