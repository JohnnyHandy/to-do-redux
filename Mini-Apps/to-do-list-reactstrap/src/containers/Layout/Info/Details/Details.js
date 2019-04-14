import React from 'react'

import {CardBody,CardTitle,CardText} from 'reactstrap'

const details = (props)=>{
    return(
        <CardBody>
            <CardTitle>
                {props.title}
            </CardTitle>
            <hr/>
            <CardText>
                {props.desc}
            </CardText>
        </CardBody>

    )
}

export default details