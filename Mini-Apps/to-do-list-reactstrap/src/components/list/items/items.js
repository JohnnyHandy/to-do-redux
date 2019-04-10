import React from 'react'

import {ListGroupItem} from 'reactstrap'

const items = (props)=>{
    return(
        <ListGroupItem>{props.name}</ListGroupItem>
    )
}

export default items