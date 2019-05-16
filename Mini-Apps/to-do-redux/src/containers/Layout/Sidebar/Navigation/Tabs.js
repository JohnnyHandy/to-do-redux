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
            const backgroundColors=['#2b3252','#ef5455','#fad744']
            const fontColors = ['#fad744','#2b3252','#ef5455']
            let border = undefined
            let borderRight = classes.tabRight
            const navItems = tabItems.map((i,index)=>{
                if(i.id==='1'){
                    border='15px 0 0 0'
                }else if(i.id==='2'){
                    border='0 0 0 0'   
                }else if(i.id==='3'){
                    border = borderRight
                } 
                let styledColor = {
                    backgroundColor:backgroundColors[index],
                    color:fontColors[index],
                    borderRadius:border
                }
                return (
                    <NavItem 
                    key={index} 
                    onClick={()=>this.props.onClickTab(i.id)}
                    className={[classes.tabItems,border].join(' ')}
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
                        </TabPane>
                        <TabPane tabId='2'>
                        </TabPane>
                        <TabPane tabId='3'>
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