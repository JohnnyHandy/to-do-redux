import React from 'react'

import {connect} from 'react-redux'
import classes from './Details.module.css'
import {CardBody,CardTitle,CardText,Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Details = (props)=>{
    let edited=null
    if(props.edited !== undefined){
        edited="Last edited on "+props.edited
    }
    let items = undefined
    if(props.activeTab === '1'){
        items = props.shortTerm
    } else if (props.activeTab ==='2'){
        items = props.mediumTerm
    } else if (props.activeTab ==='3'){
        items = props.longTerm
    }
    let disableLeftArrow = false
    let disableRightArrow = false
    if(props.itemIndex === items.length-1 || items.length ===0){
        disableRightArrow = true
    }
    if(props.itemIndex === 0){
        disableLeftArrow = true
    }
    return(
        <CardBody className={classes.background} > 
            <CardTitle>
                <h3>
                    <Button
                    disabled={disableLeftArrow}
                    onClick={props.itemIndexDown}
                    size='sm' 
                    className={classes.arrowLeft}>
                        <FontAwesomeIcon icon='arrow-circle-left'/>
                    </Button>
                    {props.title}
                    <Button
                    disabled={disableRightArrow}
                    onClick={props.itemIndexUp} 
                    size='sm'
                    className={classes.arrowRight}>
                        <FontAwesomeIcon icon='arrow-circle-right'/>
                    </Button>
                </h3>
            </CardTitle>
            <hr/>
            <CardText>
                {props.desc}
            </CardText>
            <hr/>
            <CardText className={classes.created}>
                {props.date}
                <br/>
                {edited}
            </CardText>
        </CardBody>

    )
}

const mapStateToProps = state =>{
    return{
        itemIndex:state.itemIndex,
        shortTerm:state.items.shortTerm,
        mediumTerm:state.items.mediumTerm,
        longTerm:state.items.longTerm,
        activeTab:state.activeTab
        // items:state.items
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        itemIndexUp:()=>dispatch({type:'INDEX_UP'}),
        itemIndexDown:()=>dispatch({type:'INDEX_DOWN'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details)