import React from 'react'

import classes from './Info.module.css'
import {Card} from 'reactstrap'


const info = (props)=>{
    return(
        <Card className={classes.info}>
            <Card>
                Element Title
            </Card>
            <Card>
                Element Details
            </Card>
        </Card>
    )

}

export default info