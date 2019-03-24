import React from 'react'

import Courses from '../../../components/courses/courses'
import classes from './content.css'

const content = (props)=>{
    return(
        <div className={classes.content}>
            <Courses />
        </div>
        
    )
}

export default content