import React from 'react'

import classes from './Info.css'
import Description from '../../components/Description/Description'

const info = (props)=>{
    
    let itemDescription = "Description"
    
    //  if(props.itemInfo.length > 0){
         
    //      props.itemInfo.map(i=>{
    //          if(i.id===props.indexInfo){
    //              return (itemDescription = (
    //                  <Description desc={i.itemDesc}/>
    //                  ), title=i.itemName)
    //          } 
    //      })
    //  }
    
        if(props.itemInfo.length !== 0){
            itemDescription=(
                props.itemInfo.map((i,index)=>{
                    if(i.id===props.indexInfo){
                        return <Description
                                title={i.itemName}
                                desc={i.itemDesc}
                                date={'Created on '+i.created}
                                key={index}/>
                               
                        
                    }
                })
            )
        } else{
             
             itemDescription = (
                                <Description 
                                title="Title"
                                desc="Description"
                                key={null}
                                date={null}/>
                               )
                    
        }
   
    
    
    return(
        <div className={classes.info}>
            {itemDescription}
            
        </div>
        )
}

export default info