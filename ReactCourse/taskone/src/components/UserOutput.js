import React from 'react';
import './User.css'

const UserOutput = (props) =>{
    return (
        <div className="UserOutput"> 
        <p>I am a User Output Paragraph and my username is {props.username} </p>
        <p>I am a User Output Paragraph and my username is {props.username}</p>
        </div>
        )
}

export default UserOutput
