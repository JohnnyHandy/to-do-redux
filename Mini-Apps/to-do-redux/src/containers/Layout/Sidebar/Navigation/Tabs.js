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
                    id:'1',
                },
                {
                    name:'Mid Term',
                    id:'2',
                },
                {
                    name:'Long Term',
                    id:'3',
                }
            ]
            const backgroundColors=['#f27c54','#29c8e8','#ff87f7']
            const navItems = tabItems.map((i,index)=>{
                let styledColor = {
                    backgroundColor:backgroundColors[index]
                }
                return (
                    <NavItem 
                    key={index} 
                    onClick={()=>this.props.onClickTab(i.id)}
                    className={classes.tabItems}
                    style={styledColor}
                    >
                        <NavLink>
                            {i.name}
                        </NavLink>
                    </NavItem>
                )
            })

            return(
                <React.Fragment>
                    <Nav tabs className = {classes.tabContainer}>
                        {navItems}
                    </Nav>
                    <TabContent activeTab = {this.props.tabId} >
                        <TabPane tabId='1'>
                            Content 1
                        </TabPane>
                        <TabPane tabId='2'>
                            Content 2
                        </TabPane>
                        <TabPane tabId='3'>
                            Content 3
                        </TabPane>
                    </TabContent>
                </React.Fragment>
            )
    }
    
}

   
const mapStateToProps = (state)=>{
    return {
        tabId:state.activeTab
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onClickTab:(index)=>dispatch(actions.setActiveTab(index))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Tabs)