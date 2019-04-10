import React from 'react'

import classes from './sidebar.module.css'
import {Card} from 'reactstrap'

const sidebar =(props)=>{
    return(
        <Card className={classes.sidebar}>
            <Card>
                List Sidebar
            </Card>
            <Card>
                List Element
            </Card>
        </Card>
    )
}

export default sidebar