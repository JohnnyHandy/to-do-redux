import React from 'react'

import classes from './sidebar.module.css'
import {Card} from 'reactstrap'
import List from '../../../components/list/list'

const sidebar =(props)=>{
    return(  
            <Card className={classes.sidebar}>
                <List
                className={classes.List}
                itemData={props.itemData}
                indexInfo={props.indexInfo}/>
            </Card>
    )
}

export default sidebar