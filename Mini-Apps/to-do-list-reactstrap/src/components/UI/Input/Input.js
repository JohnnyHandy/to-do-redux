import React from 'react'

import classes from './Input.module.css'
import {Input,Button} from 'reactstrap'

const input =(props)=>{
    return(
        <div className={classes.Input}>
            <Input onChange={props.changedName} type="text" className={classes.inputElement} placeholder='Item Name'/>
            <Input type='textarea' className={classes.inputElement} placeholder='Item Description'/>
            <Button onClick={props.addItem} size='sm'>Add Item</Button>
        </div>
        
    )
}

export default input