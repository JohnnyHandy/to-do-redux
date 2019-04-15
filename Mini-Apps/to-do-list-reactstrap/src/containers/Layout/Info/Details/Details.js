import React from 'react'

import classes from './Details.module.css'
import {CardBody,CardTitle,CardText} from 'reactstrap'

const details = (props)=>{
    return(
        <CardBody className={classes.background} > 
            <CardTitle>
                <p>
                    {props.title}
                </p>
            </CardTitle>
            <hr/>
            <CardText>
                {props.desc}
            </CardText>
        </CardBody>

    )
}

export default details