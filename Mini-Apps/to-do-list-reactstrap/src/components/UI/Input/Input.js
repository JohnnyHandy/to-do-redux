import React from 'react'

import classes from './Input.module.css'
import {Input,Button} from 'reactstrap'

const input =(props)=>{


    return(
        <div className={classes.Input}>
            <Input 
            onChange={props.changedName} 
            type="text" 
            className={classes.inputElement} 
            placeholder='Item Name'
            value={props.nameInput}/>
            <Input 
            onChange={props.changedDesc} 
            type='textarea' 
            className={classes.inputElement} 
            placeholder='Item Description'
            value={props.descInput}/>
            <Button onClick={props.addItem} size='sm'>
                {props.buttonText}
            </Button>
        </div>
        
    )
}

export default input