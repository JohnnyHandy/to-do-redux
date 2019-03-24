import React from 'react'

const course = (props) =>{
    return(
        <div>
            <h3>Professor: {props.professor}</h3>
            <h3>Name:{props.name}</h3>
        </div>
    )
}

export default course