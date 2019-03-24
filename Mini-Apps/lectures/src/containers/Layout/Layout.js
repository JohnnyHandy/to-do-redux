import React, {Component} from 'react'

import classes from './Layout.css'

import Title from '../../components/Title/title'
import Content from './content/content'
import Sidebar from './sidebar/sidebar'

class Layout extends Component {
    render(){
        return(
        <div className={classes.Layout}>
            <Title/>
            <Sidebar/>
            <Content/>

        </div>)

    }
}

export default Layout