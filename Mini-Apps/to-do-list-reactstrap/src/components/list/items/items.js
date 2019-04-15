import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button} from 'reactstrap'
import {ListGroupItem,CardTitle} from 'reactstrap'

import classes from './items.module.css'



const items = (props)=>{
    let editElement = null
    if(props.editIndex===props.id){
        editElement = props.editElement
    }

    return(
        <ListGroupItem>
            <CardTitle
            className={classes.items}
            onClick={props.itemIndex}>
                {props.name}
            </CardTitle>
            <hr/>
            <div>
                <Button
                className={classes.button} 
                color='warning' 
                size='sm'
                onClick={props.editInput}>
                    <FontAwesomeIcon icon='pen'/>
                </Button>
                <Button 
                className={classes.button} 
                color='danger' 
                size='sm'
                id={props.id}
                onClick={props.deleteClicked}>
                    <FontAwesomeIcon icon='times-circle'/>
                </Button>
            </div>
            {editElement}
        </ListGroupItem>
        
    )
}

export default items