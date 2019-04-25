import React from 'react'

const Char = (props) => {
    return(
        <div className="Char" onClick={props.clicked}>
        {props.character}
        </div>
        )
}

export default Char