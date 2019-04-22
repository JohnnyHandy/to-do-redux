import React from 'react'

import Details from './Details/Details'
import {Card} from 'reactstrap'
import classes from './Info.module.css'

const Info = (props)=>{
    let itemDetails = 'Item Details'
    if(props.itemData.length !== 0){
        itemDetails=(
            props.itemData.map((i,index)=>{
                if(i.id===props.itemIndex){
                    return <Details
                            title={i.itemName}
                            desc={i.itemDesc}
                            date={"Created at "+i.created}
                            edited={i.lastEdited}
                            key={index}/> 
                }
            return null
            })
        )
    } else{
         itemDetails = (
                        <Details 
                        title="Title"
                        desc="Description"
                        key={null}
                        date={null}/>
                        ) 
    }

    return(
        
            <Card className={classes.info}>
                {itemDetails}
            </Card>
        
        
    )
}

export default Info