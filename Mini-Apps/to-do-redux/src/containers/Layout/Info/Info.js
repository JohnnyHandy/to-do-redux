import React from 'react'

import Details from './Details/Details'
import {Card} from 'reactstrap'
import classes from './Info.module.css'
import {connect} from 'react-redux'

const Info = (props)=>{
    let itemDetails = 'Item Details'
    let items = undefined
    if(props.activeTab === '1'){
        items = props.shortTerm
    } else if (props.activeTab ==='2'){
        items = props.mediumTerm
    } else if (props.activeTab ==='3'){
        items = props.longTerm
    }
    if(items.length!==0){
        itemDetails=(
            items.map((i,index)=>{
                if(i.id===props.itemIndex){
                    return <Details
                            title={i.itemName}
                            desc={i.itemDesc}
                            date={"Created at "+i.created}
                            edited={i.lastEdited}
                            key={index}/> 
                }
                console.log(itemDetails)
            return null
            })
        )
    } else{
         return itemDetails = (
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

const mapStateToProps = (state) =>{
    return{
        shortTerm:state.reducer.items.shortTerm,
        mediumTerm:state.reducer.items.mediumTerm,
        longTerm:state.reducer.items.longTerm,
        activeTab:state.reducer.activeTab,
        itemIndex: state.reducer.itemIndex
    }
}

export default connect(mapStateToProps)(Info)