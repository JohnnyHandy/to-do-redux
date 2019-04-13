import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button} from 'reactstrap'
import {ListGroupItem,CardTitle} from 'reactstrap'

import classes from './items.module.css'

const items = (props)=>{
    return(
        <ListGroupItem>
            <CardTitle onClick={props.itemIndex}>{props.name}</CardTitle>
            <hr/>
            <div>
                <Button
                className={classes.button} 
                color='warning' 
                size='sm'
                >
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
        </ListGroupItem>
        
    )
}

export default items