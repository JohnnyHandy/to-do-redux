import React from 'react'

import classes from './Items.css'

const items = (props)=>{
    return(
            <div className={classes.Items}>
            <ul>
                <li>
                    <span onClick={props.itemClicked} >{props.name}</span>
                    <button 
                    className={classes.deleteButton}
                    onClick={props.editClicked}>
                    <i className="fas fa-pen"></i></button>
                    <button 
                        key={props.id} 
                        className={classes.deleteButton}
                        onClick={props.deleteClicked}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </li>
            </ul>
            </div>
        )
}

export default items