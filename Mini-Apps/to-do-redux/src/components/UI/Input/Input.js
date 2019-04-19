import React from 'react'

import classes from './Input.module.css'
import {Input,Button} from 'reactstrap'

const input =(props)=>{
    let onClickHandle = null

    return(
        <div className={classes.Input}>
            <Input 
            onChange={props.changedName} 
            type="text" 
            className={classes.inputElement} 
            placeholder='Item Name'
            defaultValue={props.nameInput}/>
            <Input 
            onChange={props.changedDesc} 
            type='textarea' 
            className={classes.inputElement} 
            placeholder='Item Description'
            defaultValue={props.descInput}/>
            <Button onClick={props.addOrEdit} size='sm'>
                {props.buttonText}
            </Button>
        </div>
        
    )
}

export default input