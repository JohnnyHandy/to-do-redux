import React, {Component} from 'react'

import classes from './input.css'

class input extends Component {

    render(){
        
        
    return(
        
        <div className={classes.Input}>
            <form>
                <label htmlFor='name'>Item Name</label>
                <input
                id="name"
                onChange={this.props.changedName}
                className={classes.InputElement} 
                type="text" 
                placeholder='Insert item Name here'
                value={this.props.nameValue}
                />
                <label htmlFor='desc'>Item Description</label>
                <input
                id='desc'
                onChange={this.props.changedDesc}
                className={classes.TextArea} 
                type='textarea'
                placeholder='Insert Item description here'
                value={this.props.descValue}
                />
            </form>
                <button onClick={this.props.clicked} /* onClick={this.handleClick}*/ >{this.props.buttonText}</button>
            
        </div>
        )
}
}

export default input