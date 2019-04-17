import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button} from 'reactstrap'
import {ListGroupItem,CardTitle} from 'reactstrap'

import classes from './Items.module.css'

const Items = (props)=>{

    if(props.id.isEven){
        
    }

    let editElement = null
    if(props.editIndex===props.id){
        editElement = props.editElement
    }

    return(
        <ListGroupItem >
        <div className={classes.listGroup}>
            <CardTitle
            className={classes.items}
            onClick={props.itemIndex}>
                <p>
                {props.name}
                </p>
                
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
            </div>
        </ListGroupItem>
        
    )
}

export default Items