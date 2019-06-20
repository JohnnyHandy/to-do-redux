import React from 'react'

import classes from './Spinner.module.css'

export const AuthSpinner =()=>(
    <div className={classes.authLoader}>
        Loading...
    </div>
)

export const ShortItemsSpinner = ()=>(
    <div className={classes.shortTerm}>
        Loading...
    </div>
)

export const MediumItemsSpinner = ()=>(
    <div className={classes.mediumTerm}>
        Loading...
    </div>
)

export const LongItemsSpinner = ()=>(
    <div className={classes.longTerm}>
        Loading...
    </div>
)





