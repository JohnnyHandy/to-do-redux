import React, {Component} from 'react'
import {Container,Card,CardGroup} from 'reactstrap'

import classes from './Layout.module.css'
import Sidebar from './sidebar/sidebar'
import Info from './Info/Info'

class Layout extends Component{
    
    state={
        items:[],
        itemIndex:0
    }

    addItemInfo = async (itemData)=> {
        await this.setState({items:itemData})
        console.log(this.state.items)
        }
    setIndexInfo = async (index)=>{
        await this.setState({itemIndex:index})
        console.log("index received=> "+ this.state.itemIndex)
    }    
    

    render(){
        return(
            <Container className={classes.Layout}>
                <h1>To-Do-List</h1>
                <CardGroup>
                    <Card className={classes.cardgroup}>
                        <Sidebar
                        itemData={this.addItemInfo.bind(this)}
                        indexInfo={this.setIndexInfo.bind(this)}/>
                    </Card>
                    <Card>
                        <Info
                        itemData={this.state.items}
                        itemIndex={this.state.itemIndex}/>
                    </Card>
                </CardGroup>
            </Container>
        )
    } 
}

export default Layout