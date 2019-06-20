import React from 'react'
import {configure,shallow,mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Button} from 'reactstrap'
import {NavBar} from './Navbar'


const setup = ()=>{
    let props = {
        isAuthenticated:true
    }

    let wrapper = shallow(<NavBar {...props}/>);
    return{props,wrapper}
}

configure({adapter: new Adapter()})

describe('<Navbar/>',()=>{
    const {wrapper} = setup()
    it('Should render one button',()=>{
        expect(wrapper.find(Button)).toHaveLength(1)
    })
})