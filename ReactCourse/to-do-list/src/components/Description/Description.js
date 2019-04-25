import React from 'react';

import classes from './Description.css'

const Description = (props) =>{
    return(
        
        <div>
            <div>
            <h3 className={classes.title} >{props.title}</h3>
            </div>
            <div className={classes.description}>
                {props.desc}
            </div>
            <div className={classes.date}>
                {props.date}
            </div>
            
        </div>
        )
}

export default Description